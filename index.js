const cliProgress = require('cli-progress');
const notion = require("./verify")
const writer = require("./writer")
const fs = require("fs");
console.log(process.argv)

// create a new progress bar instance and use shades_classic theme
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

let currentProgress = 0
let sampleNumber = 0
let START = Date.now()
let TRAIL_LENGTH = parseInt(process.argv[2]) || 10 //seconds
let csv_data_obj = []
let isDone = false
bar1.start(TRAIL_LENGTH, 0);

// Data object
let crown_raw_data_obj = {
    'TIME': [],
    'CP3': [], 
    'C3': [],
    'F5': [],  
    'PO3':[],
    'PO4':[], 
    'F6':[],
    'C4':[],  
    'CP4':[]
}

// Check the current time. Stop if time greater than TRAIL_LENGTH.
const checkTime = () => { 

  // Get current time
  let now = Date.now();
  let elapsed = (now - START);
  let elapsed_scaled = elapsed / 1000
  // Update progress bar
  //bar1.update(( elapsed / 1000 ));
  let progress_update = Math.floor(elapsed_scaled % 2)
  //console.log(progress_update)
  if (progress_update == 0){
    //console.log(elapsed_scaled)
    bar1.update(( elapsed / 1000 ));
  }
  // Stop after time > TRAIL_LENGTH
  if (( elapsed / 1000 ) > TRAIL_LENGTH) {
      console.log("Data capture complete.")
      saveData()
      isDone = true
  }
}

// Start listener for brainwaves
const getBrainwaves = (notion_device) => {
  notion_device.brainwaves("raw").subscribe((brainwaves) => {

    // If data collection done, don't add additional data
    if (isDone) return 0


    checkTime()
    let data = brainwaves.data
    brainwaves.info.channelNames.forEach((channel, index) =>{
      crown_raw_data_obj[channel] = crown_raw_data_obj[channel].concat(data[index])
    });


    // Iterate through the first data[index] channel to populate indexes for the time column
    // This should add 16 samples to crown_raw_data_obj.TIME each epoch
    data[0].forEach((val, index) => {
      crown_raw_data_obj.TIME.push(sampleNumber)
      sampleNumber += 1
    })

  });
}

// Create row for CSV file.
const csvFormatItem = (index) => {
    let item  = {
      'TIME': crown_raw_data_obj.TIME[index],
      'CP3': crown_raw_data_obj.CP3[index], 
      'C3': crown_raw_data_obj.C3[index],
      'F5': crown_raw_data_obj.F5[index],  
      'PO3':crown_raw_data_obj.PO3[index],
      'PO4': crown_raw_data_obj.PO4[index], 
      'F6': crown_raw_data_obj.F6[index],
      'C4': crown_raw_data_obj.C4[index],  
      'CP4':crown_raw_data_obj.CP4[index]
  }
  return item;
}

// Save data to .csv file
const saveData = () => {
  
  // Prepare data for csv_writer
  crown_raw_data_obj.TIME.forEach((val, index) => {
    csv_data_obj.push(csvFormatItem(index))
  })
  
  console.log("___")
  console.log(`Writing ${crown_raw_data_obj.TIME.length} samples`)
  writer.write(csv_data_obj)
}

// Start program
const main = async () => {
  const notion_device =  await notion.login()
  getBrainwaves(notion_device)
}

main()
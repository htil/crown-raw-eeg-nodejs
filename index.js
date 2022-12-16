const cliProgress = require('cli-progress');
const notion = require("./verify")

// create a new progress bar instance and use shades_classic theme
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

let currentProgress = 0
let START = Date.now();
let TRAIL_LENGTH = 10 //seconds
bar1.start(TRAIL_LENGTH, 0);

const getBrainwaves = (notion_device) => {
  notion_device.brainwaves("raw").subscribe((brainwaves) => {
    console.log(brainwaves)
    for (channel in brainwaves.info.channelNames) {

        // Get current time
        let now = Date.now();
        let elapsed = (now - START);

        // Update progress bar
        bar1.update(( elapsed / 1000 ));
    
        // Stop after time > TRAIL_LENGTH
        if (( elapsed / 1000 ) > TRAIL_LENGTH) {
            //notifier.notify('Message');
            console.log("done")
        }
    }
  });
}

const main = async () => {
  const notion_device =  await notion.login()
  getBrainwaves(notion_device)
}

main()
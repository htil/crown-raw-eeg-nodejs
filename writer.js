const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: process.argv[3] || `${Date.now()}_out.csv`,
  header: [
    {id: 'TIME', title: 'TIME'},
    {id: 'CP3', title: 'CP3'},
    {id: 'C3', title: 'C3'},
    {id: 'F5', title: 'F5'},
    {id: 'PO3', title: 'PO3'},
    {id: 'PO4', title: 'PO4'},
    {id: 'F6', title: 'F6'},
    {id: 'C4', title: 'C4'},
    {id: 'CP4', title: 'CP4'},
  ]
});

const data = [
  {
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: 'M'
  }, {
    name: 'Clair',
    surname: 'White',
    age: 33,
    gender: 'F',
  }, {
    name: 'Fancy',
    surname: 'Brown',
    age: 78,
    gender: 'F'
  }
];

const write = (array) => {
    csvWriter
  .writeRecords(array)
  .then(()=> {
    console.log('The CSV file was written successfully')
    process.exit(0);
});
}

module.exports = {write}
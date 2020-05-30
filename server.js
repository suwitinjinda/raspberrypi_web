const express = require('express')
const app = express()
const fetch = require("node-fetch");
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyUSB0', {baudRate: 9600});

const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
var url;
parser.on('data',() => {
  console.log(url,data)
})

// port.on('open', () => console.log(`port open. Data rate: ${port.baudRate}`));

app.use( function(req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }
  return next();
});

app.get('/', (req, res) => {
  console.log(req.originalUrl)
  res.json({ message: 'Hi frind' })
})
app.get('/:id', (req, res) => {
  const { params } = req;
  console.log(params.id)
  let a = params.id;
  let b = a.replace(/!/g,"/")
  let c = b.replace("$","?")
  let d = c.split("+")
  console.log(d)
  var out = d[0]+'\r\n';
  port.write('/'+out, (err) => {
    if (err) return console.log('Error on write: ', err.message);
  });
  console.log(out)
  // res.end();
    let url = d[1];
    fetch(url).then(function(data) {
        // Here you get the data to modify as you please
        console.log(data)
        }).catch(function(error) {
        // If there is any error you will catch them here
        console.log(error)
      }); 

  res.send("address:"+d[0]+','+d[1])
})

app.listen(9000, () => {
  console.log('Application is running on port 9000')
})
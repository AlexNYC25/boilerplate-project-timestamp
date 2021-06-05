// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


let isStringANumber = (string) => {
  return /^\d+$/.test(string);
}

let getDateObject = (dateString) => {

  if(dateString === undefined){
    return new Date();
  }

  if(isStringANumber(dateString)){
    return new Date(parseInt(dateString));
  }
  
  return new Date(dateString);
 
}

let generateDateJson = (dateObj) => {
  let obj = {};
  obj.unix = dateObj.getTime();
  obj.utc = dateObj.toUTCString();

  if(isNaN(dateObj.getTime())){
    return { error : "Invalid Date" }
  }

  return obj;
}

// actual microservice API 
app.get("/api/:date?", function (req, res) {
  let dateParameterDateObj = getDateObject(req.params.date);
  res.json(generateDateJson(dateParameterDateObj))
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

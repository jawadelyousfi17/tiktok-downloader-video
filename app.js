// app.js

const express = require('express');
const path = require('path');
const {getVideo,downloadMedia} = require('./index')
var bodyParser = require('body-parser')
const chalk = require("chalk");
const fs = require("fs");

const app = express();
const PORT =3000;

// Serve static files from the 'public' folder
//pp.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.json())

var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser

app.use(bodyParser.urlencoded({ extended: true }));


const el = async (url) => {
let dt  = await getVideo(url,false)
let r = await downloadMedia(dt)
return r
}
el('https://www.tiktok.com/@larrika_/video/7332248060354891013')
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, './public/index.html'));


});

// listen
app.post('/', (req, res) => {
(async () => {
const v= req.body;
  // Process the video URL or perform other actions here
  // For now, log the video URL to the console
  console.log(`Received POST request with video URL: ${v}`);
  // You might want to send a response back to the client
let t = await el(v.u)
  const d = path.join(__dirname, 'downloads',t);
return {d,t}
})().then((c)=>{
console.log(c.d)
  setTimeout(()=>{if (!fs.existsSync(c.d)) {
    return res.status(404).send('File not found');
  }
  res.setHeader('Content-Disposition', `attachment; filename=TiktoK-downloader-${c.t}`);
 res.sendFile(c.d)
console.log(c)},
2000
)
})
  
  

});










app.get('/download', (req, res) => {
(async () => {
let t = await el('https://www.tiktok.com/@douhalaribiii/video/7333153302818999558')
  const d = path.join(__dirname, 'downloads',t);
return {d,t}
})().then((c)=>{
console.log(c.d)
  setTimeout(()=>{if (!fs.existsSync(c.d)) {
    return res.status(404).send('File not found');
  }
  res.setHeader('Content-Disposition', `attachment; filename=TiktoK-downloader-${c.t}`);
 res.sendFile(c.d)
console.log(c)},
200
)
})

});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


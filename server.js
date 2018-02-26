const express = require('express');
const fs = require('fs');
const moment = require('moment');
const port = process.env.PORT || 5000;
const ytdl = require('ytdl-core');

const {
  getVideoInfo,
  parseVideoInfo,
  makeVideoName,
  downloadVideo,
  ripAudioFromVideo,
} = require('./helpers');

const app = express();

app.get('/api/info', (req, res) => {
  const url = req.headers.url;
  console.log(url);
  getVideoInfo(url)
    .then(parseVideoInfo)
    .then((info) => res.send(info));
});

app.get('/api/download', (req, res) => {
  const args = {
    fileName: req.headers.fileName,
    url: req.headers.url,
  };

  makeVideoName(args)
    .then(downloadVideo);
  // const url = req.headers.url;
  // const fileName = req.headers.fileName;
  // const fullFileName = `${pathPrefix}/${fileName}`;
  // const download = ytdl(url);
  // download.pipe(fs.createWriteStream(`${fullFileName}.flv`));
  // download.on('end', () => {
  //   ripAudioFromVideo(fullFileName);
  //   res.send(true);
  // });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

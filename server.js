const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const ytdl = require('ytdl-core');
const moment = require('moment');
const fs = require('fs');
const {
  ripAudioFromVideo,
  getVideoInfo,
  parseVideoInfo,
} = require('./helpers');

app.get('/api/info', (req, res) => {
  const url = req.headers.url;
  console.log(url);
  getVideoInfo(url)
    .then(parseVideoInfo)
    .then((info) => res.send(info));
});

app.get('/api/download', (req, res) => {
  const url = req.headers.url;
  const fileName = req.headers.fileName;
  const fullFileName = `${fileName}.flv`;
  console.log(url);
  const download = ytdl(url);
  download.pipe(fs.createWriteStream(fullFileName));
  download.on('end', () => {
    console.log('done')
    ripAudioFromVideo(fullFileName);
    res.send(true);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// function parseVideoInfo(videoInfo) {
//   const parsedInfo = {
//     author: videoInfo.author,
//     description: videoInfo.description,
//     thumbnail_url: videoInfo.thumbnail_url,
//     title: videoInfo.title,
//     video_url: videoInfo.video_url,
//   };

//   if (videoInfo.length_seconds < 3600) {
//     parsedInfo.length = moment.utc(videoInfo.length_seconds * 1000).format('mm:ss');
//   } else {
//     parsedInfo.length = moment.utc(videoInfo.length_seconds * 1000).format('hh:mm:ss');
//   }

//   return parsedInfo;
// }

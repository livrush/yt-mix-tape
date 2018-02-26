const express = require('express');
const port = process.env.PORT || 5000;

const {
  getVideoInfo,
  parseVideoInfo,
  makeVideoName,
  downloadVideo,
  ripFullAudioFromVideo,
} = require('./helpers');

const app = express();

app.get('/api/info', (req, res) => {
  const url = req.headers.url;

  getVideoInfo(url)
    .then(parseVideoInfo)
    .then((info) => res.send(info));
});

app.get('/api/download', (req, res) => {
  const args = {
    fileName: req.headers.filename,
    url: req.headers.url,
    splits: req.headers.splits,
  };

  if (args.splits.length) {
    makeVideoName(args)
      .then(downloadVideo)
      .then(ripFullAudioFromVideo)
      .then(() => res.send('complete'));
  } else {
    makeVideoName(args)
      .then(downloadVideo)
      .then(ripFullAudioFromVideo)
      .then(() => res.send('complete'));
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

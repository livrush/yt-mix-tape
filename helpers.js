const ffmpeg = require('ffmpeg');
const fs = require('fs');
const moment = require('moment');
const ytdl = require('ytdl-core');


function ripAudioFromVideo(filePath, filesInfo) {
  console.log('made it');
  var process = new ffmpeg(filePath);
  console.log('process');
  process.then(function (video) {
    // Callback mode
    console.log('then');
    video.fnExtractSoundToMP3('test.mp3', function (error, file) {
      if (error) throw new error(error);
    });
  }, function (err) {
    console.log('Error: ' + err);
  });
}

const getVideoInfo = (url) => {
  console.log(url);
  return ytdl.getInfo(url);
};

const downloadVideo = (url) => {
  return new Promise((res, rej) => {
    const download = ytdl(url);
    download.pipe(fs.createWriteStream(fullFileName));
    download.on('end', () => {
      res(fullfileName)
    });
  });
};

function parseVideoInfo(videoInfo) {
  return new Promise((res, rej) => {
    const parsedInfo = {
      author: videoInfo.author,
      description: videoInfo.description,
      thumbnail_url: videoInfo.thumbnail_url,
      title: videoInfo.title,
      video_url: videoInfo.video_url,
    };
    if (videoInfo.length_seconds < 3600) {
      parsedInfo.length = moment.utc(videoInfo.length_seconds * 1000).format('mm:ss');
    } else {
      parsedInfo.length = moment.utc(videoInfo.length_seconds * 1000).format('hh:mm:ss');
    }
    console.log(parsedInfo);
    res(parsedInfo);
    rej(videoInfo);
  });
}


module.exports = {
  ripAudioFromVideo,
  getVideoInfo,
  parseVideoInfo,
};
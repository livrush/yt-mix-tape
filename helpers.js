const ffmpeg = require('ffmpeg');
const fs = require('fs');
const moment = require('moment');
const os = require('os')
const ytdl = require('ytdl-core');

const homeDir = os.homedir();
const pathPrefix = `${homeDir}/Documents/yt-mp3-exports`;

const getVideoInfo = (url) => {
  console.log(url);
  return ytdl.getInfo(url);
};

const makeVideoName = (args) => {
  console.log('make video name', args);
  return new Promise((res, rej) => {
    args.fileName = `${pathPrefix}/${args.fileName}`;
    res(args);
  });
}

const downloadVideo = (args) => {
  console.log('download video', args);
  const { fileName, url } = args;
  return new Promise((res, rej) => {
    const download = ytdl(url);
    download.pipe(fs.createWriteStream(`${fileName}.flv`));
    download.on('end', () => {
      res(args);
    });
  });
};

function ripAudioFromVideo(filePath, filesInfo) {
  var process = new ffmpeg(filePath);
  process.then((video) => {
    video.fnExtractSoundToMP3('test.mp3', function (error, file) {
      if (error) throw new error(error);
    });
  }, function (err) {
    console.log('Error: ' + err);
  });
}

function parseVideoInfo(videoInfo) {
  return new Promise(res => {
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
  });
}


module.exports = {
  getVideoInfo,
  parseVideoInfo,
  makeVideoName,
  downloadVideo,
  ripAudioFromVideo,
};
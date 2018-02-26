const ffmpeg = require('ffmpeg');
const fs = require('fs');
const moment = require('moment');
const os = require('os')
const ytdl = require('ytdl-core');

const homeDir = os.homedir();
const pathPrefix = `${homeDir}/Documents/yt-mp3-exports`;

const getVideoInfo = url => ytdl.getInfo(url);

const makeVideoName = args => {
  return new Promise((res, rej) => {
    args.fileName = `${pathPrefix}/${args.fileName.replace(/\s/g, '-')}`;
    res(args);
  });
}

const downloadVideo = args => {
  const { fileName, url } = args;
  return new Promise((res, rej) => {
    const download = ytdl(url);
    download.pipe(fs.createWriteStream(`${fileName}.flv`));
    download.on('end', () => {
      res(args);
    });
  });
};

const ripAudioFromVideo = args => {
  console.log('rip audio from video', args);
  const { fileName } = args;
  return new Promise((res) => {
    var process = new ffmpeg(`${fileName}.flv`);
    process.then((video) => {
      video.fnExtractSoundToMP3(`${fileName}.mp3`, function (error, file) {
        if (error) throw new Error(error);
      });
      res(args);
    });
  });
}

const parseVideoInfo = videoInfo => {
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
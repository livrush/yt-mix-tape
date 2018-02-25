const ffmpeg = require('ffmpeg');

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

module.exports = {
  ripAudioFromVideo,
};

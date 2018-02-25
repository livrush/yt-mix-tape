// import fs from 'fs';
import ytdl from 'ytdl-core';

require('dotenv').config()

// const SECRET = process.env.secret;
// const CLIENT_ID = process.env.client_id;

export const log = (x) => {
  console.log(x);
}

const download = (url) => {
  ytdl.getInfo(url, {
    requestOptions: {
      // auth: 'AIzaSyBHstiHBB9lKO7MegJNwafnNmXz6zOV7pI',
    },
  })
    .then(console.log)
    .catch(console.error);
  // .pipe(fs.createWriteStream('video.flv'));
}

export default download;

export const makeId = () => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
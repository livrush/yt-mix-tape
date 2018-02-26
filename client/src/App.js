import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
import _ from 'lodash';
import URLInput from './URLInput/URLInput';
import VideoList from './VideoList/VideoList';
import VideoCard from './VideoCard/VideoCard';
import AudioSplitList from './AudioSplit/AudioSplitList';
// import AudioSplit from './AudioSplit/AudioSplit';
import DownloadButton from './DownloadButton/DownloadButton';
import { makeId } from './helpers.js';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      fileName: '',
      videoUrl: 'https://www.youtube.com/watch?v=r2tmnzPOnQg',
      video: {},
      videosList: [],
      audioSplitsList: [],
    };
    this.onDownloadButtonClick = this.onDownloadButtonClick.bind(this);
    this.onAddUrl = this.onAddUrl.bind(this);
    this.updateFileName = this.updateFileName.bind(this);
    this.getVideoInfo = this.getVideoInfo.bind(this);
    this.onAddAudioSplit = this.onAddAudioSplit.bind(this);
    this.onUpdateAudioSplit = this.onUpdateAudioSplit.bind(this);
    this.onDeleteAudioSplit = this.onDeleteAudioSplit.bind(this);
  }

  componentWillMount() {
    this.setState({
      videosList: this.state.videosList.concat(<URLInput onAdd={this.onAddUrl} key={makeId()}></URLInput>),
      audioSplitsList: this.state.audioSplitsList.concat({}),
    });
  }

  onAddUrl(url) {
    if (url.length) {
      this.setState({
        videoUrl: url,
        // list: this.state.videosList.concat(<URLInput onAdd={this.onAddUrl} key={makeId()}/>),
      });
      this.getVideoInfo(url);
    } else {
      console.error('Must be a link!');
    }
  }

  onAddAudioSplit() {
    this.setState({
      audioSplitsList: this.state.audioSplitsList.concat({}),
    });
  }

  onUpdateAudioSplit(index, key, value) {
    console.log(index, key, value);
    const { audioSplitsList } = this.state;
    console.log(audioSplitsList);
    audioSplitsList[index][key] = value;
    console.log(audioSplitsList);
    this.setState({
      audioSplitsList,
    });
  }

  onDeleteAudioSplit(index) {
    const { audioSplitsList } = this.state;
    audioSplitsList.splice(index, 1);
    this.setState({ audioSplitsList });
  }

  getVideoInfo(url) {
    axios.get('/api/info', { headers: { url } })
      .then(({ data }) => {
        this.setState({ video: data });
      });
  }

  onDownloadButtonClick() {
    const {
      fileName,
      videoUrl,
      audioSplitsList,
    } = this.state;

    const headers = {
      url: videoUrl,
      filename: fileName || 'video',
      splits: audioSplitsList,
    };

    axios.get('/api/download', {
      headers,
    }).then(({ data }) => {
        console.log(data);
        // $('#success').show();
      })
      .catch(console.err);
  }

  updateFileName(event) {
    this.setState({ fileName: event.target.value });
  }

  render() {
    const {
      onAddUrl,
      onAddAudioSplit,
      onUpdateAudioSplit,
      onDeleteAudioSplit,
      onDownloadButtonClick,
      updateFileName,
    } = this;
    const { video, videoUrl } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <ul>
            <li className="text-danger"><i className="fab fa-youtube"></i></li>
            <li><i className="fas fa-angle-double-down"></i></li>
            <li className="text-warning"><i className="fas fa-music"></i></li>
            <li className="text-success"><i className="fas fa-music"></i></li>
            <li className="text-primary"><i className="fas fa-music"></i></li>
          </ul>
        </header>
        <main className="App-content container">
          <h4>Enter URL below</h4>
          <VideoList list={this.state.videosList} videoUrl={videoUrl} onAddUrl={onAddUrl} onSelectUrl={null} />
          <div className="row">
            <div className="col-5">
              <VideoCard video={video} />
            </div>
            <div className="col-7">
              <h4>File Name At Download</h4>
              <input
                type="text"
                className="form-control"
                placeholder="Input URL"
                aria-label="Input URL"
                aria-describedby="url-input-box"
                onChange={updateFileName}
              />
              <AudioSplitList
                list={this.state.audioSplitsList}
                onAddSplit={onAddAudioSplit}
                onUpdateSplit={onUpdateAudioSplit}
                onDeleteSplit={onDeleteAudioSplit}
              />
              <DownloadButton onDownload={onDownloadButtonClick}/>
              <div id="success" className="alert alert-success alert-dismissible fade show" role="alert" style={{display: 'none'}}>
                Download successful!
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
import URLInput from './URLInput/URLInput';
import VideoList from './VideoList/VideoList';
import VideoCard from './VideoCard/VideoCard';
import DownloadButton from './DownloadButton/DownloadButton';
import { makeId } from './helpers.js';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      videoUrl: 'https://www.youtube.com/watch?v=r2tmnzPOnQg',
      video: {},
      list: [],
    };
    this.onDownloadButtonClick = this.onDownloadButtonClick.bind(this);
    this.onAddUrl = this.onAddUrl.bind(this);
  }

  componentWillMount() {
    this.setState({ list: this.state.list.concat(<URLInput onAdd={this.onAddUrl} key={makeId()}></URLInput>)});
  }

  onAddUrl(url) {
    if (url.length) {
      this.setState({
        videoUrl: url ,
        list: this.state.list.concat(<URLInput onAdd={this.onAddUrl} key={makeId()}/>),
      });
      axios.get('/api/info', { headers: { url } })
        .then(({ data }) => {
          this.setState({ video: data });
        });
    } else {
      console.error('Must be a link!');
    }
  }

  onDownloadButtonClick() {
    const { videoUrl } = this.state;
    axios.get('/api/download', { headers: { url: videoUrl } })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(console.err);
  }

  render() {
    const { onAddUrl, onDownloadButtonClick } = this;
    const { video, videoUrl } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>YT-MP3</h1>
        </header>
        <main className="container">
          <div className="row">
            <div className="col-4">
              <VideoList list={this.state.list} videoUrl={videoUrl} onAddUrl={onAddUrl} onSelectUrl={null} />
            </div>
            <div className="col-8">
              <VideoCard video={video} />
              <DownloadButton onDownload={onDownloadButtonClick}/>
            </div>
          </div>
        </main>

      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import { Consumer } from '../../context';

class Lyrics extends Component {
  state = {
    lyrics: {}
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
        this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        this.setState({ lyrics: res.data.message.body.lyrics });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { lyrics } = this.state;

    return (
      <Consumer>
        {value => {
          const { selectedTrack } = value;

          if (
            selectedTrack === undefined ||
            lyrics === undefined ||
            Object.keys(selectedTrack).length === 0 ||
            Object.keys(lyrics).length === 0
          ) {
            return <Spinner />;
          } else {
            return (
              <React.Fragment>
                <Link to="/" className="btn btn-dark btn-sm mb-4">
                  Go Back
                </Link>
                <div className="card">
                  <h5 className="card-header">
                    {selectedTrack.track_name} by{' '}
                    <span className="text-secondary">{selectedTrack.artist_name}</span>
                  </h5>
                  <div className="card-body">
                    <p className="card-text">{lyrics.lyrics_body}</p>
                  </div>
                </div>

                <ul className="list-group mt-3">
                  <li className="list-group-item">
                    <strong>Album ID</strong>: {selectedTrack.album_id}
                  </li>
                  <li className="list-group-item">
                    <strong>Song Genre</strong>:{' '}
                    {selectedTrack.primary_genres.music_genre_list.length === 0 ? 'NO GENRE AVAILABLE' : selectedTrack.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                  </li>
                  <li className="list-group-item">
                    <strong>Explicit Words</strong>:{' '}
                    {selectedTrack.explicit === 0 ? 'No' : 'Yes'}
                  </li>
                  <li className="list-group-item">
                    <strong>Release Date</strong>:{' '}
                    <Moment format="MM/DD/YYYY">{selectedTrack.first_release_date}</Moment>
                  </li>
                </ul>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Lyrics;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../context';

class Track extends Component {
  onClick = (dispatch, track) => {
    dispatch({
      type: 'SAVE_TRACK_DATA',
      payload: track
    });
  }

  render() {
    const { track } = this.props;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="col-md-6">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5>{track.artist_name}</h5>
                  <p className="card-text">
                    <strong>
                      <i className="fas fa-play" /> Track
                    </strong>
                    : {track.track_name}
                    <br />
                    <strong>
                      <i className="fas fa-compact-disc" /> Album
                    </strong>
                    : {track.album_name}
                  </p>
                  <Link
                    to={`lyrics/track/${track.track_id}`}
                    className="btn btn-dark btn-block"
                    onClick={this.onClick.bind(this, dispatch, track)}
                  >
                    <i className="fas fa-chevron-right" /> View Lyrics
                  </Link>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Track;

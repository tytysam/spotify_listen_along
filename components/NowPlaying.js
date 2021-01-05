import React from "react";

class NowPlaying extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      start: Date.now(),
      currentPosition: 0
    };
    this.timer = null;
    this.tick = () => {
      this.setState({
        currentPosition:
          Date.now() - this.state.start + (this.props.position || 0)
      });
    };
  }
  componentWillReceiveProps(props) {
    if (
      this.props.position !== props.position ||
      this.props.track !== props.track
    ) {
      this.setState({
        start: Date.now(),
        currentPosition: 0
      });
    }
  }
  componentDidMount() {
    this.timer = setInterval(this.tick, 300);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const percentage =
      +(
        (this.state.currentPosition * 100) /
        this.props.track.duration_ms
      ).toFixed(2) + "%";
    const userName = this.props.user.display_name || this.props.user.id;
    return (
      <div className="container now-playing-container row justify-content-center p-3">
        <div className="now-playing__img col-lg-6">
          <img className="" src={this.props.track.album.images[1].url} />
        </div>
        <div className="col-lg-6 now-playing__details media">
          <div className="now-playing__track-name">{this.props.track.name}</div>
          <div className="now-playing__artist-name">
            {this.props.track.artists.map(a => a.name).join(", ")}
          </div>
          <div className="media">
            <img
              className="user-image"
              src={
                (this.props.user.images &&
                  this.props.user.images.length &&
                  this.props.user.images[0].url) ||
                "/images/user-icon.svg"
              }
              width="30"
              height="30"
              alt={userName}
              title={userName}
            />
          </div>
          <div className="user-name media">{userName}</div>
        </div>
        <div className="now-playing__progress row justify-content-center p-3">
          <div
            className="now-playing__progress_bar"
            style={{ width: percentage }}
          />
        </div>
      </div>
    );
  }
}

export default NowPlaying;

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
      <div className="now-playing-container row justify-content-center p-3">
        <div className="col-lg-12">
          <div className="now-playing-img-container">
            <img className="" src={this.props.track.album.images[1].url} />
          </div>
          <div className="now-playing-details">
            <div className="now-playing-track-name">
              {this.props.track.name}
            </div>
            <div className="now-playing-artist-name">
              {this.props.track.artists.map(a => a.name).join(", ")}
            </div>

            <div className="now-playing-user-info">
              <div className="now-playing-user-image-container">
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
            </div>
            <div className="user-name">{userName}</div>
          </div>
          <div className="now-playing-progress justify-content-center p-1">
            <div
              className="now-playing-progress-bar"
              style={{ width: percentage }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NowPlaying;

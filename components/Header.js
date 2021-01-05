import Link from "next/link";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { login } from "../actions/sessionActions";
import { mutePlayback, unmutePlayback } from "../actions/playbackActions";

const getNameFromUser = user => {
  return user.display_name || user.id;
};

const Header = ({ session, muted, mutePlayback, unmutePlayback, login }) => (
  <div className="header-container">
    <Link href="/">
      <a className="link-base main-link">
        <img
          src="/images/listen-along-wordmark-dark.svg"
          height="75"
          alt="Listen Along wordmark"
        />
      </a>
    </Link>
    {session.user ? (
      <div className="media user-header">
        <div className="media__img">
          <img
            className="user-image"
            src={
              (session.user.images &&
                session.user.images.length &&
                session.user.images[0].url) ||
              "/images/user-icon.svg"
            }
            width="30"
            height="30"
            alt={getNameFromUser(session.user)}
          />
        </div>
        <div className="user-name media__bd">
          {getNameFromUser(session.user)}
        </div>
      </div>
    ) : (
      <button
        className="btn--base btn--login"
        style={{ float: "right" }}
        onClick={login}
      >
        <FormattedMessage id="login" />
      </button>
    )}
    {session.user ? (
      <div className="playback-control">
        <button
          className="btn--base btn--dark"
          onClick={() => {
            muted ? unmutePlayback() : mutePlayback();
          }}
        >
          {muted ? "Unmute" : "Mute"}
        </button>
      </div>
    ) : null}
  </div>
);

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login()),
  mutePlayback: () => dispatch(mutePlayback()),
  unmutePlayback: () => dispatch(unmutePlayback())
});

const mapStateToProps = state => ({
  session: state.session,
  muted: state.playback.muted
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import Link from "next/link";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { login } from "../actions/sessionActions";
import { mutePlayback, unmutePlayback } from "../actions/playbackActions";

const getNameFromUser = user => {
  return user.display_name || user.id;
};

const Header = ({ session, muted, mutePlayback, unmutePlayback, login }) => (
  <nav className="navbar sticky-top navbar-expand-lg navbar-light">
    <ul className="navbar-nav header mr-auto mx-5">
      <li className="nav-item mx-3 p-2 wordmark-container">
        <Link href="/">
          <a className="link-base nav-link">
            <img
              src="/images/listen-along-wordmark-dark.svg"
              height="65"
              alt="Listen Along wordmark"
            />
          </a>
        </Link>
      </li>
      {session.user ? (
        <li className="nav-item mx-3 p-2 user-info-container">
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
          <div className="user-name">{getNameFromUser(session.user)}</div>
        </li>
      ) : (
        <li className="nav-item mx-3 p-2 login-btn-container">
          <button className="btn spotify-login" onClick={login}>
            <FormattedMessage id="login" />
          </button>
        </li>
      )}
      {session.user ? (
        <li className="nav-item mx-3 p-2 mute-unmute-btn-container">
          <button
            className="btn dark"
            onClick={() => {
              muted ? unmutePlayback() : mutePlayback();
            }}
          >
            {muted ? "Unmute" : "Mute"}
          </button>
        </li>
      ) : null}
    </ul>
  </nav>
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

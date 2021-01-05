import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import { searchTracks, searchTracksReset } from "../actions/searchActions";
import { queueTrack } from "../actions/queueActions";

class ResultsList extends Component {
  render() {
    const { results, focus } = this.props;
    return (
      <ul className="add-to-queue__search-results">
        {results.map((r, index) => {
          const isFocused = focus === index;
          const className =
            "add-to-queue__search-results-item" +
            (isFocused ? " add-to-queue__search-results-item--focused" : "");
          return (
            <li
              key={r.id}
              className={className}
              onClick={() => this.props.onSelect(r.id)}
            >
              <div className="container">
                <div className="album-img">
                  <img src={r.album.images[2].url} />
                </div>
                <div className="flex-item">
                  <div className="song-name">{r.name}</div>
                  <div>{r.artists[0].name}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

class AddToQueue extends Component {
  state = {
    text: this.props.text || "",
    focus: -1
  };

  handleChange = e => {
    const text = e.target.value;
    this.setState({ text: text });
    if (text !== "") {
      this.props.searchTracks(text);
    } else {
      this.setState({ focus: -1 });
      this.props.searchTracksReset();
    }
  };

  handleSelectElement = id => {
    this.setState({ text: "" });
    this.props.queueTrack(id);
    this.props.searchTracksReset();
  };

  handleFocus = e => {
    if (e.target.value !== "") {
      this.props.searchTracks(e.target.value);
    }
  };

  handleKeyDown = e => {
    switch (e.keyCode) {
      case 38: // up
        this.setState({ focus: this.state.focus - 1 });
        break;
      case 40: // down
        this.setState({ focus: this.state.focus + 1 });
        break;
      case 13: {
        let correct = false;
        if (this.state.focus !== -1) {
          this.props.queueTrack(this.props.search.results[this.state.focus].id);
          correct = true;
        } else {
          const text = e.target.value.trim();
          if (text.length !== 0) {
            this.props.queueTrack(text);
            correct = true;
          }
        }
        if (correct) {
          this.setState({ text: "" });
          this.props.searchTracksReset();
          this.setState({ focus: -1 });
        }
        break;
      }
    }
  };

  render() {
    const placeholder = this.props.intl.formatMessage({ id: "queue.add" });
    const results = this.props.search.results;
    return (
      <div className="add-to-queue">
        <input
          className="add-to-queue__input"
          placeholder={placeholder}
          value={this.state.text}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleFocus}
        />
        {results && (
          <ResultsList
            results={results}
            onSelect={this.handleSelectElement}
            focus={this.state.focus}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  queueTrack: text => dispatch(queueTrack(text)),
  searchTracks: query => dispatch(searchTracks(query)),
  searchTracksReset: () => dispatch(searchTracksReset())
});

const mapStateToProps = state => ({
  search: state.search
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AddToQueue));

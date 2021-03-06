import React from "react";
import { FormattedMessage } from "react-intl";

const Users = ({ items }) => {
  return (
    <div className="row justify-content-center p-1">
      <h2 className="user-list-header">
        <FormattedMessage id="online" />
      </h2>
      <ul className="user-list col-12">
        {items.map((i, index) => {
          const userName =
            i && i !== null
              ? i.display_name || i.id
              : "No user info available.";
          return (
            <li key={index} className="user-list-item">
              <div className="user-image-container">
                <img
                  className="user-image"
                  src={
                    (i &&
                      i !== null &&
                      i.images &&
                      i.images.length &&
                      i.images[0].url) ||
                    "/images/user-icon.svg"
                  }
                  width="30"
                  height="30"
                  alt={userName}
                  title={userName}
                />
              </div>
              <div className="user-name">{userName}</div>
            </li>
          );
        })}
      </ul>
      <div style={{ clear: "both" }} />
    </div>
  );
};

export default Users;

import React from "react";
import PropTypes from "prop-types";


const AlertError = (props) => {
  const {message, code, onClose} = props;

  const isShow = message;

  const errorStyle = {
    position: `absolute`,
    left: `30%`,
    right: `30%`,
    top: `1%`,
    backgroundColor: `rgba(0, 0, 0, 0.7)`,
    color: `#dfcf77`,
    zIndex: `5`,
    padding: `0.5em 1em`,
    fontFamily: `Arial`,
    border: `solid 2px #dfcf77`,
    borderRadius: `10px`,
    boxShadow: `0 0 8px 0 rgba(223, 207, 119, 0.7)`,
  };

  const errorTitleStyle = {
    textAlign: `center`,
    marginBottom: `1em`,
  };

  const errorMessageStyle = {
    textAlign: `center`,
  };

  const errorCloseStyle = {
    position: `absolute`,
    top: `15px`,
    right: `15px`,
    fontSize: `18px`,
    color: `#dfcf77`,
    backgroundColor: `transparent`,
    boxShadow: `none`,
    border: `1px dashed #dfcf77`,
    borderRadius: `20px`,
    padding: `3px 10px`,
  };

  const errorElement = isShow ? (
    <div className="error" style={errorStyle}>
      <button className="error__close" type="button" onClick={onClose} style={errorCloseStyle}>Close</button>
      <h2 className="error__title" style={errorTitleStyle}>Something goes wrong :(</h2>
      <p className="error__message" style={errorMessageStyle}>
        {message}: <span>{code}</span>
      </p>
    </div>) : ``;

  return errorElement;
};

AlertError.propTypes = {
  message: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AlertError;

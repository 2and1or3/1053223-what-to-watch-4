import * as React from "react";

interface Props {
  message: string;
  code: string | number;
  onClose: () => void;
}

const AlertError: React.FunctionComponent<Props> = (props: Props) => {
  const {message, code, onClose} = props;

  const isShow = message;

  const errorElement = isShow ? (
    <div className="error">
      <button className="error__close" type="button" onClick={onClose}>Close</button>
      <h2 className="error__title">Something goes wrong :(</h2>
      <p className="error__message">
        {message}: <span>{code}</span>
      </p>
    </div>) : null;

  return errorElement;
};

export default AlertError;

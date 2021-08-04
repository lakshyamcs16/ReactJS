import '../styles/ErrorMessageStyle.css';

function ErrorMessage(props: {message: string; onClose?: () => void}) {
  return (
    <div className="error">
      <span>{props.message}</span>
      <button className="cross" onClick={props.onClose}>X</button>
    </div>
  );
}

export default ErrorMessage;

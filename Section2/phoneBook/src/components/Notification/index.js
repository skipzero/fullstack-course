const Notification = ({text, status, setMessage}) => {
  if (status === null) {
    return null;
  }
  
  return <div className={`notifications ${status}`}>
    {text}
  </div>
}

export default Notification;
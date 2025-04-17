const MessageComponent = ({ sender, content, usercolor }) => {
    return (
      <div className="message" style={{ backgroundColor: usercolor }}>
        <strong>{sender}: </strong>{content}
      </div>
    )
  }
  
  export default MessageComponent
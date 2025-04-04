const MessageComponent = ({ sender, content }) => {
    return (
      <div className="message">
        <strong>{sender}: </strong>{content}
      </div>
    )
  }
  
  export default MessageComponent
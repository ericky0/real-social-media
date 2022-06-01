import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import './messenger.scss'

export default function Messenger() {
  return (
    <>
    <Topbar />
    <div className='messenger'>
      <div className="chatMenu">
        <div>
          <input type="text" placeholder='Search for friends' />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
        </div>
      </div>
      <div className="chatBox">
        <div>
          <div className="boxTop">
            <Message />
            <Message own={true}/>
            <Message />
            <Message own={true}/>
            <Message />
            <Message own={true}/>
            <Message />
            <Message own={true}/>
            <Message />
            <Message own={true}/>
            <Message />
            <Message own={true}/>
            <Message />
            <Message own={true}/>
          </div>
          <div className="boxBottom">
            <textarea placeholder='write something ...'></textarea>
            <button>Send</button>
          </div>
        </div>
      </div>
      <div className="chatOnline">
        <div>
          <ChatOnline />
        </div>
      </div>
    </div>
    </>
    
  )
}
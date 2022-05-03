import React, { useState, useEffect } from 'react';
import '../css/Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import Mic from '@material-ui/icons/Mic';

const Chat = () => {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt('Please enter name for chat');
    if (roomName) {
      // do some clever database stuff...
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(input);
    setInput('');
  };

  return (
    <div className='chat'>
      <div className='chat-header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`} />
        <div className='chat-header-info'>
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>

        <div className='chat-header-right'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='chat-body'>
        <p className={`chat-message ${true && 'chat-receiver'}`}>
          <span className='chat-name'>Sonny Sangha</span>
          Hey, guys.
          <span className='chat-timestamp'>3.52PM</span>
        </p>
      </div>
      <div className='chat-footer'>
        <InsertEmoticon />
        <form onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type='text'
            placeholder='Type a message'
          />
          {/* <button>Send a message</button> */}
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;

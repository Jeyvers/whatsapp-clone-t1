import React, { useEffect, useState } from 'react';
import '../css/SidebarChat.css';
import { Avatar } from '@material-ui/core';

const SidebarChat = ({ addNewChat }) => {
  const [seed, setSeed] = useState('');
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt('Please enter name for chat');
    if (roomName) {
      // do some clever database stuff...
    }
  };

  return !addNewChat ? (
    <div className='sidebar-chat'>
      <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`} />
      <div className='sidebar-chat-info'>
        <h2>Room Name</h2>
        <p>Last message...</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className='sidebar-chat'>
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;

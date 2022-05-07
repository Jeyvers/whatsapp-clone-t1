import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { Avatar } from '@material-ui/core';
import '../css/SidebarChat.css';
import db from '../firebase';

const SidebarChat = ({ addNewChat, id, name }) => {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState('');

  useEffect(() => {
    // Gets last message from firestore and displays it under the name in sidebar chat.
    if (id) {
      const messagesCol = collection(db, 'rooms', id, 'messages');
      const messagesColQuery = query(messagesCol, orderBy('timestamp', 'desc'));

      onSnapshot(messagesColQuery, (snapshot) => {
        const messagesInDoc = [];
        snapshot.forEach((doc) => {
          messagesInDoc.push(doc.data());
        });
        setMessages(messagesInDoc);
      });
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt('Please enter name for chat');
    if (roomName) {
      addDoc(collection(db, 'rooms'), {
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebar-chat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`} />
        <div className='sidebar-chat-info'>
          <h2>{name}</h2>
          {/* messages array is ordered by ascending, therefore, the last message will the first message - messages[0] */}
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className='sidebar-chat'>
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;

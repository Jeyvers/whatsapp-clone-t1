import db from '../firebase';
import {
  doc,
  onSnapshot,
  collection,
  collectionGroup,
  query,
  getDocs,
  orderBy,
  setDoc,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import '../css/Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import Mic from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, 'rooms', roomId), (doc) =>
        setRoomName(doc.data().name)
      );

      // db.collection('rooms')
      //   .doc(roomId)
      //   .collection('messages')
      //   .orderBy('timestamp', 'asc')
      //   .onSnapshot((snapshot) =>
      //     setMessages(snapshot.docs.map((doc) => doc.data()))
      //   );

      // const messages = query(
      //   collectionGroup(db, 'messagas'),
      //   orderBy('timestamp', 'asc')
      // );
      // onSnapshot(messages, (snapshot) => {
      //   console.log(snapshot.docs.map((doc) => console.log(doc.data)));
      // });
      // const messagesDocs = getDocs(getMessages);
    }
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

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
          <h3>{roomName}</h3>
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
        {messages.map((message) => (
          <p className={`chat-message ${true && 'chat-receiver'}`}>
            <span className='chat-name'>{message.name}</span>
            {message.message}
            <span className='chat-timestamp'>
              {new Date(message.timestamp?.toDate()).toUFCString()}
            </span>
          </p>
        ))}
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

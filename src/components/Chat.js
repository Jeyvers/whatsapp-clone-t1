import db from '../firebase';
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
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
import { useStateValue } from '../StateProvider';

const Chat = () => {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const [{ user }, dispatch] = useStateValue();

  const messagesCol = collection(db, 'rooms', roomId, 'messages');
  const messagesColQuery = query(messagesCol, orderBy('timestamp', 'asc'));

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, 'rooms', roomId), (doc) =>
        setRoomName(doc.data().name)
      );

      // useEffect(() => {
      //   console.log('I am running, fetching data');
      //   const roomsCol = collection(db, 'rooms');

      //   const unsubscribe = onSnapshot(roomsCol, (colSnapshot) => {
      //     const rooms = [];
      //     colSnapshot.forEach((doc) => {
      //       rooms.push({ id: doc.id, data: doc.data() });
      //       console.log(rooms);
      //     });
      //     setRooms(rooms);
      //   });

      //   return () => {
      //     unsubscribe();
      //   };
      // }, []);

      // db.collection('rooms')
      //   .doc(roomId)
      //   .collection('messages')
      //   .orderBy('timestamp', 'asc')
      //   .onSnapshot((snapshot) =>
      //     setMessages(snapshot.docs.map((doc) => doc.data()))
      //   );

      //  onSnapshot(doc(db, 'rooms', roomId), (doc) =>
      //    setRoomName(doc.data().name)
      //  );

      // Took me two days and lots of code and thinking to figure the code snippet below. I am so excited to have figured this code all by myself!!!!!!!
      onSnapshot(messagesColQuery, (snapshot) => {
        const messagesInDoc = [];
        snapshot.forEach((doc) => {
          messagesInDoc.push(doc.data());
          console.log('Current data:', doc.data());
        });
        setMessages(messagesInDoc);
      });

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

    addDoc(messagesCol, {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    });

    // db.collection('rooms').doc(roomId).collection('messages').add({
    //   message: input,
    //   name: user.displayName,
    //   // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // });

    // roomsCol.add({
    //   name: roomName,
    // });

    // addDoc(collection(db, 'rooms'), {
    //   name: roomName,
    // });

    setInput('');
  };

  return (
    <div className='chat'>
      <div className='chat-header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`} />
        <div className='chat-header-info'>
          <h3>{roomName}</h3>
          <p>
            {'Last seen '}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
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
          <p
            className={`chat-message ${
              message.name === user.displayName && 'chat-receiver'
            }`}
          >
            <span className='chat-name'>{message.name}</span>
            {message.message}
            <span className='chat-timestamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
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

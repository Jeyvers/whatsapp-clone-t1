import React, { useState, useEffect } from 'react';
import '../css/Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const getRooms = async () => {
    console.log('I am running, fetching data');
    const roomsCol = collection(db, 'rooms');
    const roomsSnapshot = await getDocs(roomsCol);

    const unsubscribe = onSnapshot(roomsCol, (colSnapshot) => {
      const rooms = [];
      colSnapshot.forEach((doc) => {
        rooms.push({ id: doc.id, data: doc.data() });
        console.log(rooms);
      });
      setRooms(rooms);
    });
  };

  useEffect(() => {
    console.log('I am running, fetching data');
    const roomsCol = collection(db, 'rooms');

    const unsubscribe = onSnapshot(roomsCol, (colSnapshot) => {
      const rooms = [];
      colSnapshot.forEach((doc) => {
        rooms.push({ id: doc.id, data: doc.data() });
        console.log(rooms);
      });
      setRooms(rooms);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   db.collection('rooms').onSnapshot((snapshot) =>
  //     setRooms(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     )
  //   );
  // }, []);

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        {/* Optional chaining */}
        <Avatar src={user?.photoURL} />
        <div className='sidebar-header-right'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='sidebar-search'>
        <div className='sidebar-search-container'>
          <SearchOutlined />
          <input type='text' placeholder='Search or start new chat' />
        </div>
      </div>
      <div className='sidebar-chats'>
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          // In react, a key is used for performance.
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

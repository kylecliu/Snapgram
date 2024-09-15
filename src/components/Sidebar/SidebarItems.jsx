import React from 'react'
import Home from './Home';
import Search from './Search';
import Messages from './Messages';
import Create from './Create';
import ToProfile from './ToProfile';

const SidebarItems = () => {
  return (
    <>
      <Home />
      <Search />
      {/* <Messages /> */}
      <Create />    
      <ToProfile />
    </>
  )
}

export default SidebarItems

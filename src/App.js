import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import ViewContact from './pages/ViewContact';
import EditContact from './pages/EditContact';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  
  return (
    <div className="App">
     <Header></Header>
      <Routes>
      <Route path="/" element={<ContactList/>} />
       <Route path={"/add"} element={<AddContact></AddContact>}></Route>  
       <Route path={"/view/:contactId"} element={<ViewContact></ViewContact>}></Route>  
       <Route path={"/edit/:contactId"} element={<EditContact></EditContact>}></Route>  
      </Routes>
      {/* <Footer></Footer> */}
     
    </div>
  );
}

export default App;

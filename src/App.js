import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calender from './components/Calender/Calender';

import './App.css';
function App() {
 
    return (
      <div className='main'>
        <div className='top'>
          <div className='app-logo'>
            <img src="https://static.vecteezy.com/system/resources/previews/005/988/959/non_2x/calendar-icon-free-vector.jpg" alt="Calender image" width="60px"/>
            <p>My Calender</p>
          </div>
          <div className='main-head'>
            <h1 className='m-h'>Stay on Schedule. Stay Ahead.</h1>
            <h2 className='s-h'>Manage meetings, deadlines, and projects with a calendar that keeps your workday running smoothly.</h2>
          </div>
        </div>
        <Calender/>
      </div>
  )
}

export default App;

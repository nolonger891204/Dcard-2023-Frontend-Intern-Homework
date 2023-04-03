import './App.css'
//import { useEffect, useState } from 'react'
import { Login } from './containers/login'
import { Button } from 'antd'
import { getIssue } from './axios'

function App() {
  return (
    <div className="App">
      <Login />
      <Button onClick={()=>{getIssue()}}>
        TEST
      </Button>
    </div>
  );
}

export default App;

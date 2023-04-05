import './css/App.css'
import { useEffect, useState } from 'react'
import { Login } from './containers/login'
import { TabsContent } from './containers/tabsContent'
import { Layout, Button } from 'antd'
import { getUsername, getIssue } from './axios'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

const { Header, Content, Footer } = Layout;

const MyContent = styled(Content)`
  overflow: hidden;
  border-radius: 10px;
  margin: 0 50px;
  background: #ffffff;
  position: relative;
  padding: 20px 50px 0 50px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;

function App() {
  return (
    <Layout className="App">
      <Header theme="light" style={{background: 'none'}}>      
        <Login />
      </Header>
      <MyContent>
        <Router>
          <Routes>
            <Route 
              path='/login%3Dtrue' 
              element={<TabsContent />} 
            />
          </Routes>
        </Router>
      </MyContent>
      <Footer>

      </Footer>
    </Layout>
  );
}

export default App;

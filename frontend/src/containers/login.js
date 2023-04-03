//import { useEffect, useState } from 'react';
import { Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
//import { githubLogin } from '../axios';

const Login = ({ setLoggedIn, setUser }) => {
  return (
    <div>
      <Button 
        icon = {<GithubOutlined />}
        //onClick={() => githubLogin()}
        href="https://github.com/login/oauth/authorize?client_id=c797c8f6337a43df4d6e&scope=repo"
      >
        Github Login
      </Button>
    </div>
  );
};

export { Login };
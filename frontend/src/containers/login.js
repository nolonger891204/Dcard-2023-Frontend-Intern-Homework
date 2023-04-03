//import { useEffect, useState } from 'react';
import { Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

const Login = ({ setLoggedIn, setUser }) => {
  return (
    <div>
      <Button 
        icon = {<GithubOutlined />}
        //onClick={() => enterLoading(2)}
        href="https://github.com/login/oauth/authorize?client_id=c797c8f6337a43df4d6e"
      >
        Github Login
      </Button>
    </div>
  );
};

export { Login };
import React from "react";
import { Typography, Icon } from 'antd';
import Chatbot from './Chatbot/Chatbot';
const { Title } = Typography;

function App() {
  return (
    <div style={{backgroundColor:'#133107'}}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <Title level={2} >군파고&nbsp;<Icon type="qq" style={{color:'green'}} /></Title>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
       
        <Chatbot/>


      </div>
    </div>
  )
}

export default App

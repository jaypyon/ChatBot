import React from 'react'

import { List, Icon, Avatar } from 'antd';

function Message(props) {
    const AvatarSrc = props.who ==='병장 사소리' ? <Icon type="qq" style={{color:'green',background:''}}/> : <Icon type="smile" />  

    return (
        
        <List.Item style={{ padding: '1rem' }}>
            <List.Item.Meta
                avatar={<Avatar icon={AvatarSrc} />}
                title={props.who}
                description={props.text}
            />
        </List.Item>
        
    )
}

export default Message

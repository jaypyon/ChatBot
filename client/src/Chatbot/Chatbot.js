import Axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../_actions/message_actions';
import { List, Icon, Avatar } from 'antd';
import Message from './Sections/Message'
import Card from './Sections/Card'
function Chatbot() {

    const dispatch = useDispatch();
    const ReduxStocks = useSelector(state => state.message.messages)
    useEffect(() => {
        eventQuery('Welcome')
    }, [])
    const eventQuery = async (event) => {
        //보여줄 내용


        const eventQueryVar = {
            name: event
        }

        try {
            //쿼리 전송
            const response = await Axios.post('/api/dialogflow/eventQuery', eventQueryVar)
            //응답 표시


            for (let refinedData of response.data.fulfillmentMessages) {
                //보여줄 내용
                let smalltalk = {
                    who: '병장 사소리',
                    content: refinedData
                }

                dispatch(saveMessage(smalltalk))
                console.log(smalltalk)
            }



        } catch (e) {
            let smalltalk = {
                who: '병장 사소리',
                content: "오류 발생 : " + e
            }


            console.log(smalltalk)
            dispatch(saveMessage(smalltalk))
        }
    }
    const textQuery = async (text) => {
        //보여줄 내용
        let smalltalk = {
            who: '나',
            content: {
                text: {
                    text: text
                }
            }
        }
        console.log(smalltalk)
        dispatch(saveMessage(smalltalk))
        const textQueryVar = {
            text: text
        }

        try {
            //쿼리 전송
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVar)
            //응답 표시
            let count = 0;
            for (let refinedData of response.data.fulfillmentMessages) {
                //보여줄 내용
                count = count + 1;
                console.log(refinedData)
                let smalltalk = {
                    who: '병장 사소리',
                    content: refinedData
                }
                console.log("대답 : ", smalltalk)
                dispatch(saveMessage(smalltalk))

            }
            console.log(count);
            if (count == 0) {
                throw new Error(" 적절한 대답이 없어요.")
            }
        } catch (e) {
            smalltalk = {
                who: '병장 사소리',
                content: {
                    "platform": "PLATFORM_UNSPECIFIED",
                    "text": {
                        "text": [
                            e+" "
                        ]
                    },
                    "message": "text"
                }
            }


            console.log("오류 : ", smalltalk)
            dispatch(saveMessage(smalltalk))
        }
    }
    const keyPressHandler = (e) => {
        if (e.key === "Enter") {
            if (!e.target.value) {
                return alert('명령을 내려주세요 !')
            }

            //server단에 post 보내기
            textQuery(e.target.value)
            e.target.value = "";

        }
    }
    const makeCards = (cards)=>{
        return cards.map((card,i) => <Card key={i} cardInfo={card.structValue}/>)
    }
    const makeMessage = (message, i) => {
        console.log("ren1msg", message)
        //Card message
        if(message.content && message.content.text && message.content.text.text){
            return <Message key={i} who={message.who} text={message.content.text.text} />
        }
        
        else if(message.content && message.content.payload.fields.card){
            const AvatarSrc = message.who ==='병장 사소리' ? <Icon type="qq" style={{color:'green',background:''}}/> : <Icon type="smile" />  

            return <List.Item style={{ padding: '1rem' }}>
                        <List.Item.Meta
                            avatar={<Avatar icon={AvatarSrc} />}
                            title={message.who}
                            description={makeCards(message.content.payload.fields.card.listValue.values)}
                        />
                    </List.Item>
        }
        else{}
    }
    const createMessage = (msg) => {
        if (msg) {
            return msg.map((message, i) => {
                return makeMessage(message, i);
            })
        } else {
            return null;
        }
    }
    return (
        <div style={{ height: 700, width: 700, border: '3px solid black', borderRadius: '10px' ,backgroundColor:'#8daa82'}}>
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>
                {createMessage(ReduxStocks)}
            </div>

            <input
                style={{ margin: 0, width: '100%', height: 50, borderRadius: '4px', padding: '5px', fontSize: '1rem' }}
                placeholder="명령을 내려주세요 !"
                onKeyPress={keyPressHandler}
                type="text"
            />

        </div>
    )
}
export default Chatbot;
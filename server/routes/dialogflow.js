const express = require('express');
const router = express.Router();
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const config = require('../config/dev.js')
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;
 // Create a new session
 const sessionClient = new dialogflow.SessionsClient();
 const sessionPath = sessionClient.sessionPath(projectId, sessionId);

//두개의 루트가 존재한다.
// 첫째는 이벤트 처리 루틴
router.post('/eventQuery',async (req,res)=>{
    console.log("event shori")
    console.log(req.body.event)
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                // 에이전트에 송신하는 문구, 즉, Hard-Coding으로 지정하는게 아닌, Dynamic하게 변해야한다.
                // index.js에서 body-parser모듈을 사용하기 때문에 하기와 같이 사용할 수 있다.
               // event: req.body.event,
               name: 'Welcome',
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };
    
    // api와 실제 교신하는 부분 //await 사용한다.
    const responses = await sessionClient.detectIntent(request);
    
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    // api와의 교신 결과를 front에 다시 전송하는 부분.
    res.send(result);

})
// 둘째는 일반 대화 처리 뤁틴

router.post('/textQuery',async (req,res)=>{
    //송신 타입이 json인것을 명심하자.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // 에이전트에 송신하는 문구, 즉, Hard-Coding으로 지정하는게 아닌, Dynamic하게 변해야한다.
                    // index.js에서 body-parser모듈을 사용하기 때문에 하기와 같이 사용할 수 있다.
                    text: req.body.text,
                    // The language used by the client (en-US)
                    languageCode: languageCode,
                },
            },
        };
        
        // api와 실제 교신하는 부분 //await 사용한다.
        const responses = await sessionClient.detectIntent(request);
        
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        // api와의 교신 결과를 front에 다시 전송하는 부분.
        res.send(result);
    
})

module.exports = router;
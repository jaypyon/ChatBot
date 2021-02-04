#군파고
<html>
  <head>
Dialogflow를 이용한 챗봇 웹서비스

<img src="https://user-images.githubusercontent.com/72537190/106848877-20e79280-66f5-11eb-871e-88914cb9c9b1.png" alt="">

군생활을 체험 할 수 있다.

* 욕을하면 챗봇이 CIC에 신고 할 수 있습니다. 조심하세요.
</head>
<body>
<div>
server/config/dev.js에 자신의 dialogFlow의 인증정보를 입력한다.

내용은 다음과 같다. 

module.exports = {
    googleProjectID: 당신의 구글 프로젝트 ID,
    dialogFlowSessionID: dialogFlow 세션의 ID (아무거나 입력한다.) ,
    dialogFlowSessionLanguageCode: 'ko-KR',
    googleClientEmail: 당신의 구글 클라이언트 IMA의 Email 계정 ,
    googlePrivateKey: json 파일로 내려받은 Private Key,
    mongoURI:'',
}

마지막으로 shell의 root directory에서 환경변수를 설정한다.
[export GOOGLE_APPLICATION_CREDENTIALS=/mnt/e/Projects/autoreplyservice-429f3a60d58c.json
]
</div>
</body>
</html>

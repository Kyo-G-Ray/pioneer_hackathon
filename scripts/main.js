"use strict";

let summaryAry =[];
function sumJsonAccese() {
  
  fetch("../summary.json")
  .then(response => {
    return response.json();
  })
  
  .then(jsondata => {
    for (let i = 1; i < 5; i++) {
      summaryAry.push(jsondata["mail_" + String(i)]);
    }
  });
}
sumJsonAccese();


fetch("../mail.json")
.then(response => {
  return response.json();
})

.then(jsondata => {

  let start = document.querySelector('#startBtn');//再生ボタン
  // let stop = document.querySelector('#stop');//停止ボタン

  let txtArea = document.querySelector('#speechtxt');
  let speechTxt = txtArea.textContent;

  let readFlag = false;
  let mailRepeatCount = 1;


  function cognition() {
    const resultDiv = document.querySelector('#result-div');

    let SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
    let recognition = new SpeechRecognition();

    recognition.lang = 'ja-JP';
    recognition.interimResults = true;
    recognition.continuous = true;

    let finalTranscript = '';
    let stopFlag;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript = transcript;
        }
      }
      // resultDiv.innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>';

      stopFlag = finalTranscript.slice(-2);
      // 読んで or skip
      if(stopFlag == "んで"){
        console.log("音声認識終了");
        readFlag = true;
        recognition.stop();
        mailRepeatCount += 1;
        stopFlag = "";
        speechContinue(mailRepeatCount - 1);
      }
      else if(stopFlag == "ip" || stopFlag == "ップ"){
        console.log("音声認識終了");
        readFlag = false;
        mailRepeatCount += 1;
        stopFlag = "";
        doSpeech(mailRepeatCount);
        // recognition.stop();
      }
      else{
        console.log('語尾が"読んで" or "skip"ではありません');
        readFlag = false;
      }
    }

    // if(readFlag == true){
      recognition.start();
    // }
  }



  const readMail = class {
    constructor(email, num){
      this.from = email.mailfrom;
      this.name = email.name;
      this.header = email.header;
      this.body = email.body;
    }

    readMessage(){
      let fromText = this.from;
      let nameText = this.name + "さんからメールです。";
      let headerText = this.header;
      let bodyText = this.body;

      document.querySelector('#mailfrom').innerHTML = fromText;
      document.querySelector('#name').innerHTML = nameText;
      document.querySelector('#header').innerHTML = headerText;
      document.querySelector('#body').innerHTML = bodyText;
      // document.querySelector('#reply').innerHTML = "";

      return [nameText + headerText + "です。本文の要約を読み上げますか？", bodyText];
    }
  }



  let text, speechSet, sumText;
  let mailNum = Object.keys(jsondata).length;

  function speech(mailNum, jsondata) {
    console.log(jsondata);
    text = new readMail(jsondata, mailNum);
    text = text.readMessage();

    speechSet = new SpeechSynthesisUtterance();
    speechSet.text = text[0];
    speechSet.lang = 'ja-JP';
    speechSynthesis.speak(speechSet);


    setTimeout(() => {
      cognition();
    }, 1000);
  }

  function speechContinue(num) {
    speechSet = new SpeechSynthesisUtterance();
    sumText = summaryAry[num - 1][0];
    speechSet.text = sumText;
    speechSet.lang = 'ja-JP';
    setTimeout(() => {
      speechSynthesis.speak(speechSet);

      doSpeech(mailRepeatCount);
    }, 1000);
  }


  function doSpeech(num) {
    speech(num, jsondata["mail_" + String(num)]);
    if(mailRepeatCount == mailNum){
      recognition.stop();
    }
  }



  start.addEventListener('click', function(){
    speech(1, jsondata["mail_" + String(1)]);
  }, true);


});




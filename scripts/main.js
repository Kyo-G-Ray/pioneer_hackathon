"use strict";


fetch("../mail.json")
.then(response => {
  return response.json();
})

.then(jsondata => {

  let start = document.querySelector('#start');//再生ボタン
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
      resultDiv.innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>';

      stopFlag = finalTranscript.slice(-2);
      // 読んで or skip
      if(stopFlag == "んで"){
        console.log("音声認識終了");
        readFlag = true;
        recognition.stop();
        mailRepeatCount += 1;
        stopFlag = "";
        speechContinue();
      }
      else if(stopFlag == "ip" || stopFlag == "ップ"){
        console.log("音声認識終了");
        readFlag = false;
        mailRepeatCount += 1;
        stopFlag = "";
        setTimeout(() => {
          doSpeech(mailRepeatCount);
        }, 1000);
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
      return [nameText + headerText + "です。本文を読み上げますか？", bodyText];
    }
  }



  let text, speechSet;
  let mailNum = Object.keys(jsondata).length

  function speech(mailNum, jsondata) {
    console.log(jsondata);
    text = new readMail(jsondata, mailNum);
    text = text.readMessage();
    console.log(text[0]);

    speechSet = new SpeechSynthesisUtterance();
    speechSet.text = text[0];
    speechSet.lang = 'ja-JP';
    speechSynthesis.speak(speechSet);

    setTimeout(() => {
      cognition();
    }, 1000);
  }

  function speechContinue() {
    speechSet = new SpeechSynthesisUtterance();
    speechSet.text = text[1];
    speechSet.lang = 'ja-JP';
    setTimeout(() => {
      speechSynthesis.speak(speechSet);

      doSpeech(mailRepeatCount);
    }, 1000);
  }

  function doSpeech(num) {
    speech(num, jsondata["mail_" + String(num)]);
  }


  start.addEventListener('click', function(){//再生
    speech(1, jsondata["mail_" + String(1)]);
  }, true);


});




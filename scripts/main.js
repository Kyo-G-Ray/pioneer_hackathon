"use strict";


fetch("../mail.json")
.then(response => {
  return response.json();
})

.then(jsondata => {

  let start = document.querySelector('#start');//再生ボタン
  // let stop = document.querySelector('#stop');//停止ボタン

  let txtArea = document.querySelector('#speechtxt');//読み上げ箇所を指定
  let speechTxt = txtArea.textContent;//読み上げ箇所のテキスト取得



  console.log(jsondata.mail_1);
  

  
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
      return [nameText + headerText, bodyText];
    }
  }

  let text, speechSet;


  start.addEventListener('click', function(){//再生

    text = new readMail(jsondata.mail_1, 1);
    text = text.readMessage();
    console.log(text[0]);

    speechSet = new SpeechSynthesisUtterance();
    speechSet.text = text[0];
    speechSet.lang = 'ja-JP';
    speechSynthesis.speak(speechSet);


    if(1){
      speechSet = new SpeechSynthesisUtterance();
      speechSet.text = text[1];
      speechSet.lang = 'ja-JP';
      speechSynthesis.speak(speechSet);
    }
  }, true);


});




// stop.addEventListener('click', function(){//停止
//   speechSynthesis.cancel();
// }, false);
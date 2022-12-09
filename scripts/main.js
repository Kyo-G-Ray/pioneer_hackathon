"use strict";

$(() => {

  // // 使用・未使用のものは適時追加・削除すること

  // //ページ内リンクスムーススクロール
  // $('a[href^="#"]').on('click', function () {
  //   var href = $(this).attr("href");
  //   var target = $(href == "#" || href == "" ? 'html' : href);
  //   var position = target.offset().top;
  //   $("html, body").animate({
  //     scrollTop: position
  //   }, 550, "swing");
  //   return false;
  // });



  // /* =================== */
  // /*   	  hamburger      */
  // /* =================== */

  // let hamburger = $("#js-nav_toggle");
  // let hamBgc = $(".ham_bgc");
  // let span = $("#js-nav_toggle span");
  // let body = $("body");

  // hamburger.click(function () {
  //   hamBgc.toggleClass("active");
  //   span.toggleClass("open");
  //   body.toggleClass("hidden");
  // });

  // hamBgc.click(function () {
  //   hamBgc.toggleClass("active");
  //   span.toggleClass("open");
  //   body.toggleClass("hidden");
  // });

  // /* =================== */
  // /*   	  loading      */
  // /* =================== */


  // function lodingStop() {
  //   $('.boxAnime_load').addClass('start');
  // }
  // $(window).on('load', function () {
  //   lodingStop();
  // });


  // /* =================== */
  // /*  mask animation      */
  // /* =================== */

  // let fadeIn = document.querySelectorAll('.boxAnime');

  // window.addEventListener('scroll', () => {

  //   for (let i = 0; i < fadeIn.length; i++) {
  //     // getBoundingClientRext: 画面内における要素の位置座標取得
  //     const rect = fadeIn[i].getBoundingClientRect().top;

  //     // window.pageYOffset：スクロール量を取得
  //     const scroll = window.pageYOffset || document.documentElement.scrollTop;

  //     const offset = rect + scroll;

  //     const windowHeight = window.innerHeight; // 現在のブラウザの高さ

  //     if (scroll > offset - windowHeight + 50) {
  //       fadeIn[i].classList.add('start');
  //     }


  //   }
  // });






});



// speechSynthesis.cancel();

// const uttr = new SpeechSynthesisUtterance("Hello World!");
// // 発言を再生 (発言キューに発言を追加)
// speechSynthesis.speak(uttr);


let start = document.querySelector('#start');//再生ボタン
let stop = document.querySelector('#stop');//停止ボタン

let txtArea = document.querySelector('#speechtxt');//読み上げ箇所を指定
let speechTxt = txtArea.textContent;//読み上げ箇所のテキスト取得

start.addEventListener('click', function(){//再生
  let speechSet = new SpeechSynthesisUtterance();
  speechSet.text = speechTxt;
  speechSet.lang = 'ja-JP';
  speechSynthesis.speak(speechSet);
}, false);

stop.addEventListener('click', function(){//停止
  speechSynthesis.cancel();
}, false);
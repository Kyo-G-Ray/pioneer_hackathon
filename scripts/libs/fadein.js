$(() => {

// ======= フェードイン ======= //
  // フェードインさせたい要素にfadeUpTrigger，fadeLeftTrigger，fadeRightTriggerのどれかを付けて使用
  // 変数定義
  function def(that) {	
    let scroll = $(window).scrollTop();
    let triHeight = that.innerHeight();
    let triTop = that.offset().top + (triHeight / 2);
    let winHeight = $(window).height();
    return [scroll, triTop, winHeight];
  }
  
  const fUT = $('.fadeUpTrigger');
  const fLT = $('.fadeLeftTrigger');
  const fRT = $('.fadeRightTrigger');
  
  function fadeAnime(fIT, fadeTrigger){
    fIT.each(function(){
      let defArray = def(fIT);
  
      if (defArray[0] >= defArray[1] - defArray[2]){
        $(this).addClass(fadeTrigger);
      }
      // else {
        // $(this).removeClass(fadeTrigger);
      // }
    });
  }
  
  $(window).scroll(function () {
    fUT.each(function(){
      fadeAnime($(this), 'fadeUp');
    });
  
    fLT.each(function(){
      fadeAnime($(this), 'fadeLeft');
    });
    
    fRT.each(function(){
      fadeAnime($(this), 'fadeRight');
    });
  });

  
});
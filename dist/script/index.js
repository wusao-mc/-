"use strict";

var ipt = document.querySelector('.secipt');
var list = document.querySelector('.seclist');

ipt.onkeyup = function () {
  if (!ipt.value) {
    list.innerHTML = '';
    return;
  }

  jsonp({
    url: 'http://suggestion.baidu.com/su',
    data: 'wd=' + ipt.value,
    cb: 'cb',
    callbackName: 'mycb',
    success: function success(json) {
      list.innerHTML = '';

      for (var i = 0; i < json.s.length; i++) {
        list.innerHTML += '<li>' + json.s[i] + '</li>';
      }
    }
  });
};

$('.banner-nav li').hover(function () {
  $('.nav-box').css('display', 'block');
  ;
}, function () {
  $('.nav-box').css('display', 'none');
});
var mySwiper = new Swiper('.swiper-container', {
  autoplay: true
});
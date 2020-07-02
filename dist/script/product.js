"use strict";

//加载数据
$(function () {
  $.ajax({
    url: '../json/goods.json',
    type: 'get',
    data: 'type=3',
    dataType: 'json',
    success: function success(json) {
      $.each(json, function (index, item) {
        var goodsDom = "\n           \n              \n                <dl class=\"goods\">\n    <dt><a href=\"#\"><img src=\"".concat(item.imgurl, "\" alt=\"\"></a></dt>\n    <dd><b>").concat(item.price, "</b><em>").concat(item.oldprice, "</em></dd>\n    <dd>").concat(item.title, "</dd>\n    <dd><span>3\u671F\u514D\u606F</span><span>\u81EA\u8425</span></dd>\n    <dd><i>\u4E2D\u56FD</i></dd>\n     <dd>\n        <p>\u8003\u62C9\u6D77\u8D2D\u81EA\u8425</p>\n        <div class=\"addcar\" code=\"").concat(item.code, "\">\u7ACB\u5373\u8D2D\u4E70</div>\n    </dd>\n</dl>\n                ");
        $('.content').append(goodsDom);
      });
    }
  });
}); //点击加入购物车

$('.content').on('click', '.goods div', function () {
  // //记录商品编号
  if (localStorage.getItem('goods')) {
    var goodsArr = JSON.parse(localStorage.getItem('goods'));
  } else {
    var goodsArr = [];
  } //获取点击商品编号


  var code = $(this).attr('code'); //记录是否 加入过购物车

  var hasCode = false; //遍历数组 判断是否加入购物车

  $.each(goodsArr, function (index, item) {
    if (item.code === code) {
      item.num++;
      hasCode = true;
    }
  });

  if (!hasCode) {
    goodsArr.push({
      'code': code,
      'num': 1
    });
  }

  var strArr = JSON.stringify(goodsArr);
  localStorage.setItem('goods', strArr);
  alert('加入购物车成功');
});
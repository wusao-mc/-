"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ajax(options) {
  // 1.创建XMLHttpRequest对象（数据交互对象）
  var xhr = new XMLHttpRequest(); //w3c标准
  // var xhr = new ActiveXObject('Microsoft.XMLHTTP');//IE 5 6

  var data = '';

  if (typeof options.data === 'string') {
    data = options.data;
  }

  if (_typeof(options.data) === 'object' && options.data !== null && options.data.constructor === Object) {
    // 把{abc:123,ddd:777} 转成 'abc=123&ddd=777'
    for (var key in options.data) {
      data += key + '=' + options.data[key] + '&';
    } // data = 'abc=123&ddd=777&';


    data = data.substring(0, data.length - 1); // console.log(data);
  } // return;
  // 判断请求方式


  if (options.type.toLowerCase() === 'get') {
    xhr.open(options.type, options.url + '?' + data + '&_=' + Date.now(), true);
    xhr.send(null); // get请求
  } else if (options.type.toLowerCase() === 'post') {
    xhr.open(options.type, options.url, true); // 作用是模拟表单post来传递参数

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data); // post请求发送数据 
  } else {
    alert('目前只支持 get和post 请求！');
  } // 4.请求-响应 状态


  xhr.onreadystatechange = function () {
    // console.log(xhr.readyState);
    if (xhr.readyState == 4) {
      //请求完成 （请求状态）
      if (xhr.status >= 200 && xhr.status < 300) {
        // 得到响应数据 （响应状态）
        options.success(xhr.responseText);
      } else {
        options.error(xhr.status);
      }
    }
  };
}
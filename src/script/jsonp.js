function jsonp(options){
    // 把options.success函数声明为全局函数 'mycallback'
    window[options.callbackName] = options.success;

    // 判断参数，如果是字符串，直接赋值给data
    var data = '';
    if (typeof options.data === 'string'){
        data = options.data;
    }
    // 判断参数，如果是对象，把对象格式化成参数序列的字符串再赋值给data
    if (typeof options.data === 'object' && options.data !== null && options.data.constructor === Object){
        // 把{abc:123,ddd:777} 转成 'abc=123&ddd=777'
        for (var key in options.data){
            data += key+'='+options.data[key]+'&';
        }
        // data = 'abc=123&ddd=777&';
        data = data.substring(0,data.length-1);
    }

    // 创建script标签，并且给src属性赋值（数据地址、参数、参数值）
    var Script = document.createElement('script');
    Script.src = options.url+'?'+ options.cb +'='+options.callbackName+'&'+data;
    document.body.appendChild(Script);

    // script标签加载完成时，删除该标签
    Script.onload = function (){
        document.body.removeChild(Script);
    }
}
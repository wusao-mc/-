"use strict";

$(function () {
  //判断购物车是否有数据
  if (localStorage.getItem('goods')) {
    //=本地存储中购物车的数据
    var goodsData = JSON.parse(localStorage.getItem('goods')); //根据code获取数据

    $.ajax({
      url: '../json/goods.json',
      type: 'get',
      dataType: 'json',
      success: function success(json) {
        $.each(goodsData, function (index, item) {
          $.each(json, function (i, obj) {
            if (obj.code == item.code) {
              var goodsDom = "\n                     <tr class=\"goodslist\">\n                <td><input type=\"checkbox\">01001</td>\n                <td>\n                    <section>\n                        <dl>\n                            <dt><img src=\"".concat(obj.imgurl, "\" alt=\"\"></dt>\n                            <dd><span>").concat(obj.title, "</span></dd>\n                            <dd>\u989C\u8272\uFF1A\u767D\u8272</dd>\n                        </dl>\n                    </section>\n                </td>\n                <td class=\"price\">").concat(obj.price, "</td>\n                <td>\n                    <input class=\"btnrec\" type=\"button\" value=\" \uFF0D \">\n                    <input calss=\"valuesum\" type=\"text\" style=\"width: 50px;\" value=\"").concat(item.num, "\">\n                    <input class=\"btnadd\" type=\"button\" value=\" \uFF0B \">\n                </td>\n                <td class=\"money\">1.5</td>\n                <td><button class=\"delbtn\" code=\"").concat(obj.code, "\">\u5220\u9664</button></td>\n            </tr>\n                    ");
              $('.goodsMsg').after(goodsDom);
            }
          });
        });
      }
    }); //删除购物车数据

    $('tbody').on('click', 'td button', function () {
      $(this).parent().parent().remove();
      var code = $(this).attr('code');
      $.each(goodsData, function (index, item) {
        if (item.code == code) {
          goodsData.splice(index, 1); //删除本地存储数据

          return false;
        }
      });

      if (goodsData.length > 0) {
        // 更新本地存储中的数据
        localStorage.setItem('goods', JSON.stringify(goodsData));
      } else {
        localStorage.clear(); // $('.jiesuan').remove();
        // var noData = '<li style="line-height:80px;text-align:center;">购物车暂无数据</li>';
        // $('.goodsMsg').appendTo(noData);
      } // $(this).remove();

    });
  } else {
    var noData = "\n       <tr>\n               \n                <td><div style=\"width:300px;height:200px;padding:50px;\">\u6682\u65E0\u6570\u636E</div></td>\n            </tr>\n     ";
    $('.goodsMsg').after(noData);
  }
}); // 点击全选

$('.all').click(function () {
  if ($('.all').prop('checked')) {
    //全选
    $('.goodslist td input').prop('checked', true);
  } else {
    //取消全选
    $('.goodslist td input').prop('checked', false);
  }
});
$('.btnrec').click(function () {
  var mm = $(this).obj.code;
  console.log(mm);
}); // // 选择任务
// if ($('.all').checked == "checked"){
//     console.log(111111);
// }
// $('.goodslist').on('click', 'td input', function () {
//    console.log(22222);
//     // var selectArr = [];//记录所有选项的状态
//     // $('.goodslist td input').each(function (index, item) {
//     //     if ($(item).prop('checked')) {
//     //         selectArr.push('a');
//     //     } else {
//     //         selectArr.push('b');
//     //     }
//     // });
//     // // [a,a,a,a]   [a,b,a,a]
//     // if (selectArr.indexOf('b') == -1) {//[a,a,a,a]全选
//     // //    $('.all').prop('checked', true);
//     // console.log(111);
//     // } else {//[a,b,a,a]取消全选
//     // //    $('.all').prop('checked', false);
//     // console.log(222);
//     // }
// });

$('.tbody').on('click', '.btnadd', function () {
  console.log($(this).prev().value);
}); // var valuenumstr=document.querySelector('.valuesum').value;
// console.log(valuenumstr);
// $(function(){
//     $('.btnrec').click(function () {
//         if ($('') > 1) {
//             $('.valuesum').value -= 1
//         } else (
//             $('.valuesum').value = 1
//         )
//     });
//     $('.btnadd').click(function () {
//         if ($('.valuesum') < 20) {
//             $('.valuesum').value += 1
//         } else (
//             $('.valuesum').value = 20
//         )
//     });
// })
// $('.btnadd').click(function(){
//     console.log(11111);
//     // console.log($(this).next().value);
//     // let count=$(this).next().value;
//     // count++;
//     // if(count<1){
//     //     count=1;
//     // }
//     // $(this).next().value(count);
//     // let money = ($(this).parent().previousSibling().html()) * ($(this).parent().nextSibling().html());
//     // $(this).next().value(money);
// })
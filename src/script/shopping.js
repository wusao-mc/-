
 
$(function(){
    //判断购物车是否有数据

 if(localStorage.getItem('goods')){
//=本地存储中购物车的数据
var goodsData=JSON.parse(localStorage.getItem('goods'));
//根据code获取数据
$.ajax({
    url:'../json/goods.json',
    type:'get',
    dataType:'json',
    success:function(json){
        $.each(goodsData,function(index,item){
            $.each(json,function(i,obj){
                if(obj.code==item.code){
                
                   
                   
                    
                    var goodsDom=`
                     <tr class="goodslist">
                <td><input type="checkbox">01001</td>
                <td>
                    <section>
                        <dl>
                            <dt><img src="${obj.imgurl}" alt=""></dt>
                            <dd><span>${obj.title}</span></dd>
                            <dd>颜色：白色</dd>
                        </dl>
                    </section>
                </td>
                <td class="price">${obj.price}</td>
                <td>
                    <input class="btnrec" type="button" value=" － ">
                    <input calss="valuesum" type="text" style="width: 50px;" value="${item.num}">
                    <input class="btnadd" type="button" value=" ＋ ">
                </td>
                <td class="money">1.5</td>
                <td><button class="delbtn" code="${obj.code}">删除</button></td>
            </tr>
                    `
                    $('.goodsMsg').after(goodsDom);
                }
            })

        })
    }
});
//删除购物车数据

$('tbody').on('click','td button',function(){
    $(this).parent().parent().remove();
    var code=$(this).attr('code');

    $.each(goodsData,function(index,item){
        if(item.code==code){
            goodsData.splice(index,1);//删除本地存储数据
            return false;

        }
    })

    if (goodsData.length > 0) {
        // 更新本地存储中的数据
        localStorage.setItem('goods', JSON.stringify(goodsData));
    } else {
        localStorage.clear();
        // $('.jiesuan').remove();
      
        // var noData = '<li style="line-height:80px;text-align:center;">购物车暂无数据</li>';
        // $('.goodsMsg').appendTo(noData);
    }
    // $(this).remove();
})

 }else{
    
  
   
     var noData = `
       <tr>
               
                <td><div style="width:300px;height:200px;padding:50px;">暂无数据</div></td>
            </tr>
     `;
     
     $('.goodsMsg').after(noData);
 }


});

// 点击全选
$('.all').click(function () {
    if ($('.all').prop('checked')) {//全选
        $('.goodslist td input').prop('checked', true);
    } else {//取消全选
        $('.goodslist td input').prop('checked', false);
    }
});


$('.btnrec').click(function(){
    var  mm=$(this).obj.code;
    console.log(mm);
    
});

// // 选择任务
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


$('.tbody').on('click','.btnadd',function(){
console.log($(this).prev().value);

    
})
// var valuenumstr=document.querySelector('.valuesum').value;
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



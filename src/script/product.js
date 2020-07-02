//加载数据
$(function () {
    $.ajax({
        url: '../json/goods.json',
        type: 'get',
        data: 'type=3',
        dataType: 'json',
        success: function (json) {
            $.each(json,function (index, item) {
                var goodsDom = `
           
              
                <dl class="goods">
    <dt><a href="#"><img src="${item.imgurl}" alt=""></a></dt>
    <dd><b>${item.price}</b><em>${item.oldprice}</em></dd>
    <dd>${item.title}</dd>
    <dd><span>3期免息</span><span>自营</span></dd>
    <dd><i>中国</i></dd>
     <dd>
        <p>考拉海购自营</p>
        <div class="addcar" code="${item.code}">立即购买</div>
    </dd>
</dl>
                `;
                $('.content').append(goodsDom);
            })
        }

    })
});
//点击加入购物车
$('.content').on('click','.goods div',function(){
 
 
    
    // //记录商品编号
    if(localStorage.getItem('goods')){
        var goodsArr=JSON.parse(localStorage.getItem('goods'));

    }else{
        var goodsArr=[];
    }
    //获取点击商品编号
    var code=$(this).attr('code');
    //记录是否 加入过购物车
    var hasCode=false;
    //遍历数组 判断是否加入购物车
    $.each(goodsArr,function(index,item){
        if(item.code===code){
            item.num++;
            hasCode=true;
        }
    })
    if(!hasCode){
        goodsArr.push({'code':code,'num':1});


    }
    var strArr=JSON.stringify(goodsArr);
    localStorage.setItem('goods',strArr);
    alert('加入购物车成功');

});

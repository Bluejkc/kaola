

$(function () {

    //生成数据
     $.ajax({
        type: "get",
        url: "../api/shopping_car.php",
        async: true,
        data: {
            'm': 'index',
            'a': 'spcar',
        },
        success: function(str) {
            var data = JSON.parse(str);
            console.log(data);
            if(data==''){
                console.log(data);
                $('.spq').css('display','none');
                $wsp = $('<div></div>');
                $wsp.html('暂无商品加入购物车！');
                $wsp.css('height','300px');
                $wsp.css('lineHeight','300px');
                $wsp.css('textAlign','center');
                $('.cartMain').append($wsp);
            }

            else if(!data==''){
                console.log(data);
                $('.spq').css('display','block');
                $mysp = '';
                for($i=0; $i<data.length;$i++){
                    $mysp += `
                        <ul class="order_list" index="${data[$i].id}">
                        <li class="li_chk">
                            <input type="checkbox" id="checkbox_2" class="son_check">
                            <label for="checkbox_2"></label>
                        </li>
                        <li class="li_xq">
                            <div class="li_img"><a href="javascript:;"><img src="../${data[$i].imgurl}" style="width:80px;height:80px;"></a></div>
                            <div class="li_text">${data[$i].title}</div>
                        </li>
                        <li class="li_explain">
                            <p>${data[$i].explain}</p>
                        </li>
                        <li class="li_price">
                            <p class="price">￥${data[$i].price}</p>
                        </li>
                        <li class="li_num">
                            <div class="amount_box">
                                <a href="javascript:;" class="reduce reSty">-</a>
                                <input type="text" value="${data[$i].qty}" class="sum">
                                <a href="javascript:;" class="plus">+</a>
                            </div>
                        </li>
                        <li class="li_allprice">
                            <p class="sum_price">￥${(data[$i].price)*(data[$i].qty)}</p>
                        </li>
                        <li class="li_cz">
                            <p class="del"><a href="javascript:;" class="delBtn">移除商品</a></p>
                        </li>
                        </ul>
                    `
                }
                $('.order_content').append($mysp);
            }
        }
    });



    //点击添加数量

   $('body').on('click','.plus',function(){

        var val = $(this).prev().val();//获取input值
        val++;
        if(val>999){
            val = 999;
        }
        $(this).prev().val(val);

        //小计
        price($(this));
        var arr = checknum();
        allnum(arr);
        allprice(arr);
   });


   //点击减少数量
   
   $('body').on('click','.reSty',function(){

    var val = $(this).next().val();//获取input值
    val--;
    if(val<1){
        val = 1;
    }
    $(this).next().val(val);

    //小计
    price($(this));
    var arr = checknum();
        allnum(arr);
        allprice(arr);

});

    //单一产品价格小计(函数封装)
    function price(item){
         var num = item.parent().find('input').val();
         var itemprices = item.parents('.list_num').prev().find('p').text();
         itemprices = $.trim(itemprices);
         itemprices = itemprices.substring(1);
         var all = num*itemprices;

    item.parents('.list_num').next().find('p').html('￥&nbsp;' + all.toFixed(2));

    };
   
   /**-点击删除产品 */
    //点击删除产品列表
    var $order_lists = null;
    var $order_content = '';
    //事件委托，打开提示框
    $('body').delegate('.delBtn','click',function(){
        $order_lists = $(this).parents('.order_list');
        $order_content = $order_lists.parents('.order_content');
        $('.model_bg').fadeIn(300);
        $('.my_model').fadeIn(300);

        //确认删除商品
            $('body').delegate('.dialog-sure','click',function(){
               
                $order_lists.remove();
                var arr = checknum();
                allnum(arr);
                allprice(arr);

                if($order_content.html().trim() == null || $order_content.html().trim().length == 0){
                    $('.carshop ').hide();
                    $('.emptycar').show();
                }
                closeM();
            });

    });

    //关闭提示框
    $('body').delegate('.closeModel','click',function(){
       closeM();
       
    });
    $('body').delegate('.dialog-close','click',function(){
        closeM();
        
     });
    function closeM() {
        $('.model_bg').fadeOut(300);
        $('.my_model').fadeOut(300);
    }

    
    
    //全删

   $('.barshoping').click(function(){
        $('.carshop ').hide();
       $('.emptycar').show();
   });



 
    $wholeChexbox = $('.whole_check'),                 //全选
    $cartBox = $('.cartBox'),                       //商铺盒子
    $shopCheckbox = $('.shopChoice'),               //每个商铺的checkbox
    $sonCheckBox = $('.son_check');                 //每个商铺下的商品的checkbox
        //全选
    var ischecked = true;
    $('.whole_check').on('click', function() {
        //prop() 添加属性(行为的)  attr（）添加属性 
        if(ischecked) {
            $(this).prop('checked', 'checked');
            $('.son_check').prop('checked', 'checked');
            
            var arr = checknum();
                //总数量
            allnum(arr);
            //总价格
            allprice(arr);
            
        } else {
            
            $(this).removeAttr('checked');
            $('.son_check').removeAttr('checked');
            var arr = checknum();
                //总数量
            allnum(arr);
            //总价格
            allprice(arr);
        }
        ischecked = !ischecked; 
        
    });

//勾选的数量
    function checknum(){
        var arr = [];
        var le = $('.son_check').size();
        for(var i = 0; i < le; i++) {
            if($('.son_check').eq(i).prop('checked')) {
                arr.push(i);
            }
        }
        return arr;
        console.log(arr)
       
    }
    


//全选补充，未选满，失去全选

$('.order_content').on('click','.son_check',function(){

     var arr=checknum();//被勾选的
    if(arr.length==$('.son_check').size()){
        $('.whole_check').prop('checked', 'checked');   
    }
    else{  
        $('.whole_check').removeAttr('checked');
    }
   //总数量
        allnum(arr);
        //总价格
        allprice(arr);

    })

  

    //商品数量
//数量
function allnum(arr) {
    var num = 0;
    for(var i = 0; i < arr.length; i++) {
        num += parseInt($('.sum').eq(arr[i]).val());
    }
    $('.piece_num').html(num);
    //      console.log(123);
}

    
    
   // 商品总价
    function allprice(arr) {
        var price = 0;
        for(var i = 0; i < arr.length; i++) {
            var nowpri = $('.sum_price').eq(arr[i]).text();
            nowpri = $.trim(nowpri);
            nowpri = nowpri.substring(1);
            price += parseInt(nowpri);
        }
        $('.total_text').html( price.toFixed(2));
        
        //添加结算样式
            if(price!=0){
                if(!$('.calBtn a').hasClass('btyshy')){
                    $('.calBtn a').addClass('btyshy');
                    $('.calBtn a').css('background','#ff2337');
                    $('.calBtn a').css('cursor','pointer');
                }
            }else{
                if($('.calBtn a').hasClass('btyshy')){
                    $('.calBtn a').removeClass('btyshy');
                    $('.calBtn a').css('background','#B0B0B0');
                    $('.calBtn a').css('cursor','not-allowed');
                }
            }
        
    }
})
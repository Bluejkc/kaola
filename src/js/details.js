document.addEventListener('DOMContentLoaded',()=>{
    console.log(666);
    let statusCode = [200,304]; 
    

    //获取主页传参的值
    let Ohref=window.location.href;
    let arrhref=Ohref.split("?id=");
    let id = arrhref[1];

    let xhr = new XMLHttpRequest();

    // 4)在js中处理数据
    xhr.onload = function(){
        let shop = JSON.parse(xhr.responseText);
        console.log(shop);
        let ellipsis = document.querySelector('.ellipsis');
        let p = document.createElement('p');
        p.innerHTML = shop[0].explain;
        ellipsis.appendChild(p);

        //图片
        let showImg = document.querySelector('.showImg');
        let img = document.createElement('img');
        let number = (shop[0].imgurl).slice(6);
        console.log(number);
        img.src = "./.."+number;
        img.style.width = 400+'px';
        img.style.height = 400+'px';
         showImg.appendChild(img);
        //商品名
        let product_title = document.querySelector('.product-title');
        console.log(product_title);
        product_title.innerHTML = shop[0].title;

        //价格
        let price = document.querySelector('.price');
        price.innerHTML = '￥'+shop[0].price;

        //参考价
        let offprice = document.querySelector('.offprice');
        offprice.innerHTML = '参考价 ￥'+shop[0].offprice;

        //预估价
        let ygj = document.querySelector('.ygj');
        ygj.innerHTML = ((shop[0].price)*0.03).toFixed(2);

        //大概到达时间
        let f_bold = document.querySelector('.f-bold');
        let nowdate = new Date();
        console.log(nowdate);
        let month = nowdate.getMonth();

        let date  = nowdate.getDate()+1;
        let arr = '天一二三四五六'.split('');
        let week = nowdate.getDay()+1;
        f_bold.innerHTML = month + '月' + date + '日 '+'( 星期' + arr[week]+')';

        //点击加减数量
        let ctrnum_minus = document.querySelector('.ctrnum-minus');
        let ctrnum_plus = document.querySelector('.ctrnum-plus');
        let ctrnum_qty = document.querySelector('.ctrnum-qty');
        let lx;
        ctrnum_minus.onmousedown = function(){
            let qty = document.querySelector('.ctrnum-qty').value;
            lx = setInterval(function(){
                qty--;
                if(qty<1){
                    qty = 1;
                }
                
                ctrnum_qty.value = qty;
            },100);
           
        }
        ctrnum_plus.onmousedown = function(){
            let qty = document.querySelector('.ctrnum-qty').value;
            lx = setInterval(function(){
                qty++;
                if(qty>999){
                    qty = 999;
                }
                
                ctrnum_qty.value = qty;
            },100);
        }
        ctrnum_minus.onmouseup = function(){
            clearInterval(lx);
        }
        ctrnum_plus.onmouseup = function(){
            clearInterval(lx);
        }

    }
    xhr.open('get','../api/details.php?id='+id,true);
    xhr.send();

    let num = document.querySelector('.num');
    let jiarugwc = document.querySelector('.jiarugwc');
    

    jiarugwc.onclick = function(){
        let qty = document.querySelector('.ctrnum-qty').value; 
        let num = new XMLHttpRequest(); 
        num.onload = function(){
            let shop = JSON.parse(xhr.responseText);

        }
        num.open('get','../api/details1.php?dianji=1&num='+qty+'&id='+id,true);
        num.send();
    }


    let lijigm = document.querySelector('.lijigm');
    lijigm.onclick = function(){
        location.href = '../html/shopping_car.html';
        console.log(id);
    }
    
})

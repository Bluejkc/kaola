//轮播图
document.addEventListener('DOMContentLoaded',()=>{

    let banner = document.querySelector('#banner');
    let ul = banner.children[0];

    // 无缝滚动关键1：复制第一张到最后
    ul.appendChild(ul.children[0].cloneNode(true));

    // 图片数量
    let len = ul.children.length;

    // 默认索引值
    let index = 0;

    // 添加分页效果
    let page = document.createElement('div');
    page.className = 'page';
    for(let i=0;i<len-1;i++){
        let span = document.createElement('span');
        span.innerText = i+1;
        if(i === index){
            span.className = 'active';
        }
        page.appendChild(span);
    }
    // 写入页面
    banner.appendChild(page);

    // 添加左右按钮
    let btnPrev = document.createElement('span');
    btnPrev.className = 'btn-prev';
    btnPrev.innerHTML = '<';
    let btnNext = document.createElement('span');
    btnNext.className = 'btn-next';
    btnNext.innerHTML = '>';
    banner.appendChild(btnPrev);
    banner.appendChild(btnNext);


    // 1）设置ul宽度，达到水平排列的效果
    ul.style.width = banner.clientWidth*len + 'px';

    // 每隔3s显示一张图片
    let timer = setInterval(autoPlay,3000);


    // 鼠标移入移出
    banner.onmouseenter = function(){
        clearInterval(timer);
    }
    banner.onmouseleave = function(){
        timer = setInterval(autoPlay,3000);
    }


    // 点击页码切换
    page.onclick = function(e){
        if(e.target.tagName.toLowerCase() === 'span'){
            index = e.target.innerText-1;
            show();
        }
    }

    banner.onclick = function(e){
        // 上一张
        if(e.target.className === 'btn-prev'){
            index--;

            show();
        }else if(e.target.className === 'btn-next'){
            index++;

            show();
        }
    }


    function autoPlay(){
        index++;

        show();

    }

    function show(){
        // 无缝滚动关键2：当滚动到复制那张图片时，瞬间重置回初始状态，并把index改成1
        if(index>=len){
            ul.style.left = 0;
            index = 1;
        }else if(index<0){
            index = len-2;
        }

        animate(ul,{left:-index * banner.clientWidth});

        // 显示页码高亮
        // 去除其他高亮，添加当前高亮
        for(let i=0;i<len-1;i++){
            if(i===index){
                page.children[i].className = 'active';
            }else{
                page.children[i].className = '';
            }
        }

        // 当到达复制图片动画时，高亮显示第一个页码
        if(index === len-1){
            page.children[0].className = 'active';
        }

    }


    //口碑爆款
    //显示商品数据：
    let statusCode = [200,304]; 
    let kbShop = document.querySelector('.kbShop');
    let xhr = new XMLHttpRequest();

    // 4)在js中处理数据
   xhr.onload = function(){
            let shop = JSON.parse(xhr.responseText);
            console.log(shop);
            // 2）根据数据生成html结构
            let ul = document.createElement('ul');
            ul.className = 'ulList'
            ul.innerHTML = shop.map(goods=>{
                return `<li shop-id="${goods.id}" class="list">
                    <img src="${goods.imgurl}"/>
                    <h4>${goods.title}</h4>
                    <p class="explain">${goods.explain}</p>
                    <div class="priceitem">
                        <span class="price">￥${goods.price}</span>
                        <span class="offprice"><del>￥${goods.offprice}</del></span>
                        <a href="#" class="goods-btn">
                            <span class="goods">立即购买</span>
                        </a>
                        
                    </div>
                </li>`
            }).join('');

            // 写入页面
            // kbShop.innerHTML = '';
            kbShop.appendChild(ul);
    }

    // 2）配置参数，建立与服务器的连接
    xhr.open('get','../src/api/index.php');

    // 3）发送请求
    xhr.send();


    //点击进入商品详情页
    kbShop.onclick = shop;


    // 99元任选2件
    //显示商品数据：
    let rxShop = document.querySelector('.rxShop');
    let rxlist = new XMLHttpRequest();

    // 4)在js中处理数据
   rxlist.onload = function(){
            let shop = JSON.parse(rxlist.responseText);

            // 2）根据数据生成html结构
            let ul = document.createElement('ul');
            ul.className = 'ulList'
            ul.innerHTML = shop.map(goods=>{
                return `<li shop-id="${goods.id}" class="list">
                    <img src="${goods.imgurl}"/>
                    <h4>${goods.title}</h4>
                    <p class="explain">${goods.explain}</p>
                    <div class="priceitem">
                        <span class="price">￥${goods.price}</span>
                        <span class="offprice"><del>￥${goods.offprice}</del></span>
                        <a href="#" class="goods-btn">
                            <span class="goods">立即购买</span>
                        </a>
                        
                    </div>
                </li>`
            }).join('');

            // 写入页面
            // rxShop.innerHTML = '';
            rxShop.appendChild(ul);
    }

    // 2）配置参数，建立与服务器的连接
    rxlist.open('get','../src/api/index.php');

    // 3）发送请求
    rxlist.send();

    //点击进入商品详情页
    rxShop.onclick = shop;


    //母婴儿童
    //显示商品数据：
    let myShop = document.querySelector('.myShop');
    let mylist = new XMLHttpRequest();

    // 4)在js中处理数据
   mylist.onload = function(){
            let shop = JSON.parse(mylist.responseText);

            // 2）根据数据生成html结构
            let ul = document.createElement('ul');
            ul.className = 'ulList'
            ul.innerHTML = shop.map(goods=>{
                return `<li shop-id="${goods.id}" class="list">
                    <img src="${goods.imgurl}"/>
                    <h4>${goods.title}</h4>
                    <p class="explain">${goods.explain}</p>
                    <div class="priceitem">
                        <span class="price">￥${goods.price}</span>
                        <span class="offprice"><del>￥${goods.offprice}</del></span>
                        <a href="#" class="goods-btn">
                            <span class="goods">立即购买</span>
                        </a>
                        
                    </div>
                </li>`
            }).join('');

            // 写入页面
            // myShop.innerHTML = '';
            myShop.appendChild(ul);
    }

    // 2）配置参数，建立与服务器的连接
    mylist.open('get','../src/api/index.php');

    // 3）发送请求
    mylist.send();

    //点击进入商品详情页
    myShop.onclick = shop;



    //封装一个函数，进入商品详情页
    function shop(e){
        if(e.target.tagName.toLowerCase() === 'img'){
            // 获取当前li
            let li = e.target.parentNode;
            let liId = li.getAttribute('shop-id');
            location.href = 'html/details.html?id='+liId;
        }else if(e.target.tagName.toLowerCase() === 'h4'){
            // 获取当前li
            let li = e.target.parentNode;
            let liId = li.getAttribute('shop-id');
            location.href = 'html/details.html?id='+liId;
        }else if(e.target.className === 'goods'){
            // 获取当前li
            let li = e.target.parentNode.parentNode.parentNode;
            let liId = li.getAttribute('shop-id');
            location.href = 'html/details.html?id='+liId;
        }
    }
    
});
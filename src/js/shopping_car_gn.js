
  document.addEventListener('DOMContentLoaded',()=>{
   //.获取页面元素
    let order_content = document.querySelector('.order_content');
    let dialog = document.querySelector('.dialog-sure');
    let barshoping = document.querySelector('.barshoping');
    console.log(order_content);

   
  //点击删除单一商品;(服务器删除)
    order_content.onclick = e =>{
        if(e.target.className === 'delBtn'){
            var idx = e.target.parentNode.parentNode.parentNode.getAttribute('index');
          
            dialog.onclick = ()=>{
        
                //1.创建请求对象
                let xhr = new XMLHttpRequest();
                //2与服务器建立链接，传递信息
                xhr.open('get' ,'../api/shopping_car_delete.php?id='+idx,true);

                //3发送请求
                xhr.send();

                
            }
        }
    }

    //点击删除所有产品
    barshoping.onclick = ()=>{
          console.log(666);
          //1.创建请求对象
          let xhr = new XMLHttpRequest();
          //2与服务器建立链接，传递信息
          xhr.open('get' ,'../api/shopping_car_delete.php?a=0',true);

          //3发送请求
          xhr.send();
          window.location.replace("../html/shopping_car.html");
    }
  })
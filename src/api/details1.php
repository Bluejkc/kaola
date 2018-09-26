<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'kaolashop';
    
    // 创建连接
    $conn = new mysqli($servername, $username, $password, $dbname);

    // 检测连接是否成功
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    } 

    //查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');

    //接收数据
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $dianji = isset($_GET['dianji']) ? $_GET['dianji'] : null;
    $num = isset($_GET['num']) ? $_GET['num'] : null;
   
    $sql = "SELECT * FROM goodslist WHERE id='$id' ";

    //点击按钮，加入购物车
    if($dianji=="1"){
    //查询该商品的qty
        $sql1 = "SELECT qty FROM goodslist WHERE id='$id'";
        $a = $conn->query($sql1);
        $r = $a->fetch_array(MYSQLI_ASSOC);

        //点击按钮一次qty加1,更改数据库
        $qty1 = $r['qty']+$num;
        $sql2 = "UPDATE goodslist set qty = $qty1  WHERE id='$id' ";
        
        $conn->query($sql2);
        // var_dump($b);
    }

    // var_dump($sql);
    // 读取数据
    // 获取查询结果集（集合）
    $result = $conn->query($sql);
    // var_dump($result);

    // 从集合中取出所有数据
    $row = $result->fetch_all(MYSQLI_ASSOC);

   // var_dump($row);
    //释放查询结果集，避免资源浪费
    $result->close();
    // 关闭数据库，避免资源浪费
    $conn->close();
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
    
    


?>
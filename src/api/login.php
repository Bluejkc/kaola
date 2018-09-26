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

    $username = isset($_POST['username']) ? $_POST['username'] : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;
    $password = md5($password);

    $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    // 读取数据
    // 获取查询结果集（集合）
    $result = $conn->query($sql);

    // 从集合中取出所有数据
    $row = $result->fetch_array(MYSQLI_ASSOC);

   // var_dump($row);
    //释放查询结果集，避免资源浪费
    $result->close();
    // 关闭数据库，避免资源浪费
    $conn->close();
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
    

?>
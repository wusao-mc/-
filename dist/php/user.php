<?php
/* 
接口文档
method: get
url: './data/user.php'
参数：
    type = login  登录
           add    注册 
    user = 用户名
    pass = 用户密码
返回：
    {err:0,msg:'登录成功'}
*/

header('Content-Type:text/html;charset=utf-8');

$type = $_GET['type'];
$user = $_GET['user'];
$pass = $_GET['pass'];

if ($type && $user && $pass) {
    //连接数据库 
    $link = mysqli_connect('localhost','root','root','mysql');
    if(!$link){
        die('连接失败：'.mysqli_connect_error());
    }
    //设置编码
    mysqli_set_charset($link,'utf8');

    //判断要登录还是要注册 
    // 执行sql语句
    if ($type === 'login'){
        $login_sql = "select * from kaola where username='$user' and password='$pass'";
        $login_res = mysqli_query($link,$login_sql);
        $login_arr = mysqli_fetch_all($login_res);
        if (count($login_arr) > 0){
            echo '{"err":0,"msg":"登录成功"}';
        } else {
            echo '{"err":-3,"msg":"账号或密码错误"}';
        }
    } else if($type === 'add') {
        $select_sql = "select * from kaola where username='$user'";
        $select_res = mysqli_query($link,$select_sql);
        // print_r($select_res );
        // die();
        $select_arr = mysqli_fetch_all($select_res);
        
        if(count($select_arr) > 0){
            die('{"err":-1,"msg":"用户名已被占用"}');
        } else {
            $insert_sql = "insert into kaola (username,password) values ('$user','$pass')";
            $insert_res = mysqli_query($link,$insert_sql);
            if ($insert_res){
                echo '{"err":0,"msg":"注册成功"}';
            } else {
                echo '{"err":-2,"msg":"注册失败"}';
            }
        }
    } else {
        die('{"err":-9,"msg":"参数错误"}');
    }
    mysqli_close($link);
} else {
    echo '{"err":-9,"msg":"参数错误"}';
};

?>
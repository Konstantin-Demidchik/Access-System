<?php
$db_location='localhost';
$db_user='root';
$db_pass="";
$db_name="insystem";
$db_con=mysqli_connect($db_location,$db_user,$db_pass,$db_name);

if(!$db_con){
    exit('Error database connection');
}
mysqli_query($db_con, "SET NAMES 'utf-8'");

function database($arg){
    global $db_con;
    $ar=mysqli_query($db_con,$arg);
    if(!$ar){
        exit($arg);
    }
    return $ar;
}

<?php 
    include("Medoo.php");
    use Medoo\Medoo;
    header("Content-Type: application/json; charset=UTF-8");
    $database = new Medoo([
        'database_type' => 'mysql',
        'database_name' => 'regiscar',
        'server' => 'localhost',
        'username' => 'root',
        'password' => '',
        'charset' => 'utf8'
    ]);
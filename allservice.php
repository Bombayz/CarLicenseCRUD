<?php
    include("action/set.php");

    if(isset($_GET['action'])) {
        $action = $_GET['action'];
        if($action == "search"){
            $sql = "SELECT * FROM `regis_customer` WHERE";
            $sql .= "`car_license_1` LIKE '".$_GET['car_license_1_head']."' OR";
            $sql .= "`car_license_2` LIKE '".$_GET['car_license_2_head']."' OR";
            $sql .= "`car_license_3` LIKE '".$_GET['car_license_3_head']."' OR";

            if($_GET['car_owner_firstname_head'] == ""){
                $sql .= "`car_owner_firstname` LIKE '".$_GET['car_owner_firstname_head']."' OR";
            }else{
                $sql .= "`car_owner_firstname` LIKE '%".$_GET['car_owner_firstname_head']."%' OR";
            }

            if($_GET['car_owner_firstname_head'] == ""){
                $sql .= "`car_owner_lastname` LIKE '".$_GET['car_owner_lastname_head']."' ";
            }else{
                $sql .= "`car_owner_lastname` LIKE '%".$_GET['car_owner_lastname_head']."%' ";
            }

            $myData = array();
            $data = $database->query($sql)->fetchAll();
            $myData['data'] = $data;

            if(count($myData['data']) == 0){
                $myData['status'] = "notFound";
            }else{
                $myData['status'] = "ok";
            }

            echo json_encode($myData);

        }elseif($action == "selectUserData"){
            echo json_encode($database->select("regis_customer","*",[ "no"=>$_GET["number"] ]));
        }elseif($action == "updateUserData"){

            $database->update("regis_customer",[
                "car_license_1" => $_GET["car_license_1"],
                "car_license_2" => $_GET["car_license_2"],
                "car_license_3" => $_GET["car_license_3"],
                "car_brand" => $_GET["car_brand"],
                "car_type" => $_GET["car_type"],
                "car_body_number" => $_GET["car_body_number"],
                "car_tax_day" => $_GET["car_tax_day"],
                "car_owner_firstname" => $_GET["car_owner_firstname"],
                "car_owner_lastname" => $_GET["car_owner_lastname"],
                "car_identity_number" => $_GET["car_identity_number"],
                "car_owner_address" => $_GET["car_owner_address"],
                "car_owner_tel" => $_GET["car_owner_tel"],              
            ],[
                "no" => $_GET['no']
            ]);

            $myData = array();
            $myData['status'] = "ok";
            echo json_encode($myData);

        }elseif($action == "setStatus"){

            if(isset($_GET['note'])){
                $database->update("regis_customer",[
                "status" => $_GET["to"],
                "car_date_getjob" => date('Y-m-d'),
                "car_note" => $_GET["note"]          
                ],[
                    "no" => $_GET['id']
                ]);    
            }else{
                $database->update("regis_customer",[
                "status" => $_GET["to"],
                "car_date_getjob" => date('Y-m-d'),     
            ],[
                "no" => $_GET['id']
            ]);
            }

            $myData = array();
            $myData['status'] = "ok";
            echo json_encode($myData);


        }elseif($action == "getWorkTable"){

            $myData = array();

            $data = $database->select("regis_customer","*",[
                "status" => "2"
            ]);

            $myData['data'] = $data;

            $myData['status'] = "ok";
            echo json_encode($myData);

        }elseif($action == "getCurrentTable"){

            $myData = array();
            $year = date("Y");

            // $data = $database->select("regis_customer","*",[
            //     "status" => "1"
            // ]);

            $sql = "SELECT * FROM `regis_customer`";

            if(isset($_GET['month'])){
                if($_GET['month'] == 0){
                    $sql .= " WHERE YEAR(car_tax_day) = ".$year ;
                }else{
                    $sql .= " WHERE MONTH(car_tax_day) = ".$_GET['month']." AND YEAR(car_tax_day) = ".$year ;
                }
            }else{
                $sql .= " WHERE YEAR(car_tax_day) = ".$year ;
            }

            $data = $database->query($sql)->fetchAll();

            $myData['data'] = $data;

            $myData['status'] = "ok";
            echo json_encode($myData);
                    
        }elseif($action == "getSuccessTable"){

            $myData = array();

            $data = $database->select("regis_customer","*",[
                "status" => "3"
            ]);

            $myData['data'] = $data;

            $myData['status'] = "ok";
            echo json_encode($myData);
        }
        
        


    } else {
        echo json_encode(["Fail"]) ; 
    }


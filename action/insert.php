<?php 
    include('set.php');

    if(isset($_POST)){

        if($_POST['car_owner_firstname'] == ''){
            $firstname = "ไม่ได้กรอก";
        }else{
            $firstname = $_POST['car_owner_firstname'];
        }

        if($_POST['car_owner_lastname'] == ''){
            $lastname = "ไม่ได้กรอก";
        }else{
            $lastname = $_POST['car_owner_lastname'];
        }

        if($_POST['car_license_1'] == ''){
            $car_license_1 = "-";
        }else{
            $car_license_1 = $_POST['car_license_1'];
        }

        if($_POST['car_license_2'] == ''){
            $car_license_2 = "-";
        }else{
            $car_license_2 = $_POST['car_license_2'];
        }

        if($_POST['car_license_3'] == ''){
            $car_license_3 = "ไม่ได้กรอก";
        }else{
            $car_license_3 = $_POST['car_license_3'];
        }

        $database->insert("regis_customer", [
            "car_license_1" => $car_license_1,
            "car_license_2" => $car_license_2,
            "car_license_3" => $car_license_3,
            "car_brand" => $_POST['car_brand'],
            "car_type" => $_POST['car_type'],
            "car_body_number" => $_POST['car_body_number'],
            "car_tax_day" => $_POST['car_tax_day'],
            "car_owner_firstname" => $firstname,
            "car_owner_lastname" => $lastname,
            "car_identity_number" => $_POST['car_identity_number'],
            "car_owner_address" => $_POST['car_owner_address'],
            "car_owner_tel" => $_POST['car_owner_tel'],
            "status" => "1"
        ]);


        echo json_encode(["Ok"]) ; 


    }else{
        echo "Nothing Happing" ;
        echo json_encode(["Fail"]) ; 
    }
    


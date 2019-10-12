<?php 
include('./dbConfig.php');

$action = isset($_GET['action']) ? $_GET['action'] : "index" ;
$table="tbl_employee";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

switch ($action) {

    case "index":
        $data = json_decode(file_get_contents('php://input'), true);
        if(empty($data)){
            $query = "SELECT * FROM {$table}";
            $result = $con->query($query);
            $employee_arr=array();
            $employee_arr["data"]=array();
            if ($result->num_rows > 0) {
                $employee_arr["code"]=200;
                while($row = $result->fetch_assoc()) {
                    extract($row);
                    $employee_item=array(
                        "id" => $id,
                        "name" => $name,
                        "email" => $email,
                        "phone" => $phone,
                        "department" => $department,
                        "status" => $status
                    );
                    array_push($employee_arr["data"], $employee_item);
                }
            } else {
                $employee_arr["code"]=400;
            }
            echo json_encode($employee_arr);
            exit;
        }else{
            $query2 = "SELECT * FROM {$table} WHERE id = {$data['id']}";
            $result2 = $con->query($query2);
            $employee_arr=array();
            $employee_arr["data"]=array();

            if ($result2->num_rows > 0) {
                $employee_arr["code"]=200;
                while($row = $result2->fetch_assoc()) {
                    extract($row);
                    $employee_item=array(
                        "id" => $id,
                        "name" => $name,
                        "email" => $email,
                        "phone" => $phone,
                        "department" => $department,
                        "status" => $status
                    );
                    array_push($employee_arr["data"], $employee_item);
                }
            } else {
                $employee_arr["code"]=400;
            }
            echo json_encode($employee_arr);
            exit;
        }
        break;

    case "add":
        $data = json_decode(file_get_contents('php://input'), true);
        $query = "INSERT INTO {$table} (name,email,phone,department,status) VALUES ('{$data['name']}','{$data['email']}','{$data['phone']}','{$data['department']}',1)";
        $result = $con->query($query);
        $last_id = $con->insert_id;        
        $query2 = "SELECT * FROM {$table} WHERE id = {$last_id}";
        $result2 = $con->query($query2);

        $employee_arr=array();
        $employee_arr["data"]=array();
        if ($result2->num_rows > 0) {
            $employee_arr["code"]=200;
            //$employee_arr['data']['param'] = $_POST;
            while($row = $result2->fetch_assoc()) {
                extract($row);
                $employee_item=array(
                    "id" => $id,
                    "name" => $name,
                    "email" => $email,
                    "phone" => $phone,
                    "department" => $department,
                    "status" => $status
                );               
                array_push($employee_arr["data"], $employee_item);
            }
            
        } else {
            $employee_arr["code"]=400;
        }        
       
        echo json_encode($employee_arr);
        break;
    case "update":
        $data = json_decode(file_get_contents('php://input'), true);
        $query ="UPDATE {$table} SET name = '{$data['name']}',email = '{$data['email']}',phone = '{$data['phone']}',department = '{$data['department']}' WHERE id={$data['id']}";
        $result = $con->query($query);
        $employee_arr=array();
        $employee_arr["data"]=array();
        if($result){
            $query2 = "SELECT * FROM {$table} WHERE id = {$data['id']}";
            $result2 = $con->query($query2);
            $employee_arr=array();
            $employee_arr["data"]=array();

            if ($result2->num_rows > 0) {
                $employee_arr["code"]=200;
                while($row = $result2->fetch_assoc()) {
                    extract($row);
                    $employee_item=array(
                        "id" => $id,
                        "name" => $name,
                        "email" => $email,
                        "phone" => $phone,
                        "department" => $department,
                        "status" => $status
                    );
                    array_push($employee_arr["data"], $employee_item);
                }
            } else {
                $employee_arr["code"]=400;
            }
            echo json_encode($employee_arr);
            exit;
        }else{
            $employee_arr["code"]=400;
        }        
        echo json_encode($employee_arr);
        break;
    default:
        $query = "SELECT * FROM {$table}";
        $employee_arr=array();
        $employee_arr["code"]=400;
        $employee_arr["data"]=array();
        echo json_encode($employee_arr);
}





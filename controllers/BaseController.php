<?php
include_once (ROOT."/models/BaseModel.php");
class BaseController
{
    public function actionIndex()
    {
        require_once(ROOT.'/views/build/index.php');
        return true;
    }

    public function actionApigetlevels(){
        $BaseModel= new BaseModel();
        $model_result = $BaseModel->GetLevels();
        $user_result = $BaseModel->getUserInf();
        $api=[
            'login_status'=>$user_result,
            'api_data'=>$model_result,
        ];
        header("Access-Control-Allow-Origin: *");
        header('Content-Type: application/json; charset=utf-8');
        $api = json_encode( $api );
        $api = preg_replace_callback('/\\\\u([a-f0-9]{4})/i', create_function('$m', 'return chr(hexdec($m[1])-1072+224);'), $api);
        $api = iconv('cp1251', 'utf-8', $api);
        echo $api;
        return true;
    }
    public function actionApigetkeys(){
        $BaseModel= new BaseModel();
        $model_result = $BaseModel->getKeys();
        $user_result = $BaseModel->getUserInf();
        $api=[
            'login_status'=>$user_result,
            'api_data'=>$model_result,
        ];
        header("Access-Control-Allow-Origin: *");
        header('Content-Type: application/json; charset=utf-8');
        $api = json_encode( $api );
        $api = preg_replace_callback('/\\\\u([a-f0-9]{4})/i', create_function('$m', 'return chr(hexdec($m[1])-1072+224);'), $api);
        $api = iconv('cp1251', 'utf-8', $api);
        echo $api;
        return true;
    }
    public function actionApiaddlevel(){
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
        }
        header('Content-Type: application/json; charset=utf-8');
        if(isset($_POST)){
            $levelnum=(int)$_POST['levelnum'];
            $levelname=$_POST['levelname'];
            $BaseModel= new BaseModel();
            $result=$BaseModel->addLevel($levelnum,$levelname);
            $api=[
                'status'=>$result,
            ];
        }else{
            $api=[
                'status'=>false,
            ];
        }
        $api = json_encode( $api );
        $api = preg_replace_callback('/\\\\u([a-f0-9]{4})/i', create_function('$m', 'return chr(hexdec($m[1])-1072+224);'), $api);
        $api = iconv('cp1251', 'utf-8', $api);
        echo $api;
        return true;
    }
    public function actionApiaddroom(){
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
        }
        header('Content-Type: application/json; charset=utf-8');
        if(isset($_POST)){
            $roomnum=(int)$_POST['roomnum'];
            $roomtype=$_POST['roomtype'];
            $levelid=(int)$_POST['levelid'];
            $BaseModel= new BaseModel();
            $result=$BaseModel->addRoom($roomnum,$roomtype,$levelid);
            $api=[
                'status'=>$result,
            ];
        }else{
            $api=[
                'status'=>false,
            ];
        }
        $api = json_encode( $api );
        $api = preg_replace_callback('/\\\\u([a-f0-9]{4})/i', create_function('$m', 'return chr(hexdec($m[1])-1072+224);'), $api);
        $api = iconv('cp1251', 'utf-8', $api);
        echo $api;
        return true;
    }
    public function actionApigetroom(){
        $BaseModel= new BaseModel();
        if(isset($_GET['id'])){
            $id = (int)$_GET['id'];
            $model_result = $BaseModel->GetRoom($id);
        }else{
            $model_result=[];
        }
        $user_result = $BaseModel->getUserInf();
        $api=[
            'login_status'=>$user_result,
            'api_data'=>$model_result,
        ];
        header('Content-Type: application/json; charset=utf-8');
        $api = json_encode( $api );
        $api = preg_replace_callback('/\\\\u([a-f0-9]{4})/i', create_function('$m', 'return chr(hexdec($m[1])-1072+224);'), $api);
        $api = iconv('cp1251', 'utf-8', $api);
        echo $api;
        return true;
    }
    public function actionApigetusers(){
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
        }
        header('Content-Type: application/json; charset=utf-8');;
        $BaseModel= new BaseModel();
        $result=$BaseModel->getUsers();
        $api=$result;
        $api = json_encode( $api );
        $api = preg_replace_callback('/\\\\u([a-f0-9]{4})/i', create_function('$m', 'return chr(hexdec($m[1])-1072+224);'), $api);
        $api = iconv('cp1251', 'utf-8', $api);
        echo $api;
        return true;
    }
    public function actionApicreatekey(){
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
        }
        if(isset($_POST['user_id'])){
            $BaseModel= new BaseModel();
            $input_array=[
                'user_id'=>(int)$_POST['user_id'],
                'level_id'=>(int)$_POST['level_id'],
                'room_id'=>(int)$_POST['room_id'],
                'key_type'=>$_POST['key_type']
            ];

            $result = $BaseModel->addKey($input_array);
            $api=[
                'status'=>$result,
            ];
        }else{
            $api=[
                'status'=>false,
            ];
        }
        $api = json_encode( $api );
        $api = preg_replace_callback('/\\\\u([a-f0-9]{4})/i', create_function('$m', 'return chr(hexdec($m[1])-1072+224);'), $api);
        $api = iconv('cp1251', 'utf-8', $api);
        echo $api;
        return true;
    }
    public function actionApigetaccessusers(){
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
        }
        if(isset($_GET['type']) && isset($_GET['lid']) && isset($_GET['rid'])){
            $BaseModel= new BaseModel();
            $user_result = $BaseModel->getUserInf();
            $type=$_GET['type'];
            $lid=(int)$_GET['lid'];
            $rid=(int)$_GET['rid'];
            if($type=="stud"){
                $type="`key_type`='student' OR `key_type`='prepod' OR `key_type`='security' OR `key_type`='admin' OR";
            }else if($type=="stuff"){
                $type="`key_type`='security' OR `key_type`='admin' OR `key_type`='stuff' OR";
            }
            else if($type=="lec"){
                $type="`key_type`='student' OR `key_type`='prepod' OR `key_type`='security' OR `key_type`='admin' OR";
            }
            else if($type=="lab"){
                $type="`key_type`='prepod' OR `key_type`='security' OR `key_type`='admin' OR";
            }
            else{
                $type="";
            }
            
            $adr = database("SELECT * FROM `users_keys` WHERE $type (`level_id`= $lid AND `room_id`=$rid)");
            $room_array=[];
            while($row=mysqli_fetch_array($adr)){
                $user=mysqli_fetch_array(database("SELECT * FROM `users`WHERE `user_id`=".$row['user_id']));
                $room_array[]=[
                    'key_id'=>$row['key_id'],
                    'user_id'=>$row['user_id'],
                    'level_id'=>$row['level_id'],
                    'room_id'=>$row['room_id'],
                    'key_data'=>$row['key_data'],
                    'key_status'=>$row['key_status'],
                    'key_type'=>$row['key_type'],
                    'key_adddate'=>$row['key_adddate'],
                    'user_data'=>$user['user_name']
                ];
            }
            $api=[
                'login_status'=>$user_result,
                'api_data'=>$room_array,
            ];
            $api = json_encode( $api );
            $api = preg_replace_callback('/\\\\u([a-f0-9]{4})/i', create_function('$m', 'return chr(hexdec($m[1])-1072+224);'), $api);
            $api = iconv('cp1251', 'utf-8', $api);
            echo $api;
        }else{
            $BaseModel= new BaseModel();
            $user_result = $BaseModel->getUserInf();
            $api=[
                'login_status'=>$user_result,
                'api_data'=>[],
            ];
            $api = json_encode( $api );
            $api = preg_replace_callback('/\\\\u([a-f0-9]{4})/i', create_function('$m', 'return chr(hexdec($m[1])-1072+224);'), $api);
            $api = iconv('cp1251', 'utf-8', $api);
            echo $api;
        }
        
        return true;
    }
    public function actionApideletekey(){
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
        }
        header('Content-Type: application/json; charset=utf-8');
        if(isset($_GET['id'])){
            $BaseModel= new BaseModel();
            $id=(int)$_GET['id'];
            $result = $BaseModel->deleteKey($id);
            $api=[
                'status'=>$result,
            ];
        }else{
            $api=[
                'status'=>false,
            ];
        }
        $api = json_encode( $api );
        $api = preg_replace_callback('/\\\\u([a-f0-9]{4})/i', create_function('$m', 'return chr(hexdec($m[1])-1072+224);'), $api);
        $api = iconv('cp1251', 'utf-8', $api);
        echo $api;
        return true;
    }
}
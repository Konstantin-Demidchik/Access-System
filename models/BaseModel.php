<?php

class BaseModel
{
    public function getUserInf(){
        if(isset($_SESSION['user_id'])){
            $user_array=[
                'status'=>true,
                'user_id'=>$_SESSION["user_id"],
                'user_permissions'=>$_SESSION["user_permissions"],
            ];
        }else{
            $user_array=[
                'status'=>false
            ];
        }
        return $user_array;
    }
    public function GetLevels(){
        $adr=database("SELECT * FROM `building_level` ORDER BY `level_num` DESC");
        $level_array=[];
        while($row=mysqli_fetch_array($adr)){
            $level_array[]=[
                'level_id'=>$row['level_id'],
                'level_num'=>$row['level_num'],
                'level_name'=>$row['level_name'],
                'level_adddate'=>$row['level_adddate'],
                'rooms_information'=>$this->getRoomsOnLevel($row['level_id']),
            ];
        }
        return $level_array;
    }
    public function GetKeys(){
        $adr=database("SELECT * FROM `users_keys`");
        $key_array=[];
        while($row=mysqli_fetch_array($adr)){
            $access='';
            $keytype='';
            if($row['key_type'] == 'student'){
                $access='Ключ студента: Доступ в лекционные и аудитории';
            }else if($row['key_type'] == 'prepod'){
                $access='Ключ преподавателя: Доступ в лекционные, аудитории и лаборатории';
            }
            else if($row['key_type'] == 'stuff'){
                $access='Ключ персонала: Доступ в подсобки и другие комнаты спец. назначения';
            }
            else if($row['key_type'] == 'security'){
                $access='Ключ охраны: Доступ во все помещения';
            }
            else if($row['key_type'] == 'admin'){
                $access='Ключ Администратора: Полный доступ во все помещения';
            }else if($row['key_type'] == 'default'){
                $res=mysqli_fetch_array(database("SELECT * FROM `building_rooms` WHERE `room_id`=".$row['room_id']));
                $access='Ключ от комнаты '.$res['room_num'];
            }
            $user=mysqli_fetch_array(database("SELECT * FROM `users` WHERE `user_id`=".$row['user_id']));
            $key_array[]=[
                'key_id'=>$row['key_id'],
                'user_id'=>$row['user_id'],
                'room_id'=>$row['room_id'],
                'key_data'=>$row['key_data'],
                'key_status'=>$row['key_status'],
                'key_type'=>$row['key_type'],
                'key_adddate'=>$row['key_adddate'],
                'key_access'=>$access,
                'key_user'=>$user
            ];
        }
        return $key_array;
    }

    private function getRoomsOnLevel($id){
        $id=(int)$id;
        $adr=database("SELECT * FROM `building_rooms` WHERE `level_id`=$id ORDER BY `room_num`");
        $rooms_array=[];
        while($row=mysqli_fetch_array($adr)){
            $rooms_array[]=[
                'room_id'=>$row['room_id'],
                'room_num'=>$row['room_num'],
                'room_type'=>$row['room_type'],
                'level_id'=>$row['level_id'],
                'level_adddate'=>$row['level_adddate'],
            ];
        }
        return $rooms_array;
    }

    public function GetRoom($id){
        $id=(int)$id;
        $adr=database("SELECT * FROM `building_rooms` WHERE `room_id`=$id");
        $room_array=[];
        while($row=mysqli_fetch_array($adr)){
            $room_array[]=[
                'room_id'=>$row['room_id'],
                'room_num'=>$row['room_num'],
                'room_type'=>$row['room_type'],
                'level_adddate'=>$row['level_adddate'],
            ];
        }
        return $room_array;
    }

    public function getUsers(){
        $adr=database("SELECT * FROM `users`");
        $room_array=[];
        while($row=mysqli_fetch_array($adr)){
            $room_array[]=[
                'user_id'=>$row['user_id'],
                'user_name'=>$row['user_name'],
                'user_status'=>$row['user_status'],
                'user_regdate'=>$row['user_regdate'],
            ];
        }
        return $room_array;
    }

    public function addLevel($num,$name){
        $adr=database("INSERT INTO `building_level`(`level_id`, `level_num`, `level_name`, `level_adddate`) VALUES (NULL,$num,'$name',NOW())");
        return true;
    }
    public function addRoom($num,$name,$levelid){
        $adr=database("INSERT INTO `building_rooms`(`room_id`, `room_num`, `room_type`, `level_id`, `level_adddate`) VALUES (NULL,$num,'$name',$levelid,NOW())");
        return true;
    }
    public function addKey($input_data){
        $adr=database("INSERT INTO `users_keys`(`key_id`, `user_id`, `level_id`, `room_id`, `key_data`, `key_status`,`key_type`, `key_adddate`) VALUES (null,".$input_data['user_id'].",".$input_data['level_id'].",".$input_data['room_id'].",'".md5(uniqid(rand(),1))."','active','".$input_data['key_type']."',NOW())");
        return true;
    }
    public function deleteKey($id){
        $adr=database("DELETE FROM `users_keys` WHERE `key_id`=$id");
        return true;
    }
}
<?php
  $file_name =  $_FILES['file']['name']; //obtendo o nome do arquivo
  $tmp_name = $_FILES['file']['tmp_name']; //obtendo temp_name do arquivo
  $file_up_name = time().$file_name; //tornando o nome do arquivo dinâmico adicionando tempo antes do nome do arquivo
  move_uploaded_file($tmp_name, "files/".$file_up_name); //movendo arquivo para a pasta especificada com nome dinâmico
?>

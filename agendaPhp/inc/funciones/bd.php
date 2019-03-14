<?php

/**credenciales de la base de datos*/
/**conexion a la base de datos */
define('DB_USUARIO','root');
define('DB_PASSWORD','123456');
define('DB_HOST','localhost');
define('DB_NOMBRE','agendaphp');


$conn = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE );

 /**echo $conn->ping();si sale uno de al accder al archivo donde se esta 
  * haciendo desde url quiere decir que esta hecha la conexion */

 
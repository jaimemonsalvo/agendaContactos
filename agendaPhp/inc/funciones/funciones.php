<?php

function obtenerContactos(){
 include 'bd.php'; /*al llamar la funcion se incluye la conexion para poder realizar la consulta */
 
 try {
      return $conn->query("SELECT id, nombre, empresa, telefono FROM contactos"); /**va a hacer la consulta a un query, lo q viene siendo la base de  datos */
         } catch (Exception $e) {
              echo "Error!!". $e->getMessage() . "<br>";
              return false;
        }
}


/**obtiene un contacto toma un id */

function obtenerContacto($id){
     include 'bd.php'; /*al llamar la funcion se incluye la conexion para poder realizar la consulta */
 
     try {
          return $conn->query("SELECT id, nombre, empresa, telefono FROM contactos WHERE id=$id"); /**va a hacer la consulta a un query, lo q viene siendo la base de  datos */
             } catch (Exception $e) {
                  echo "Error!!". $e->getMessage() . "<br>";
                  return false;
            }

}


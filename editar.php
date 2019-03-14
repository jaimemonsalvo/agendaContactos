<?php 
include 'inc/funciones/funciones.php';
include 'inc/layout/header.php';


  /**VALIDAMOS EL ID y lo volvemos a entero */
$id =filter_var($_GET['id'], FILTER_VALIDATE_INT);

/** Pequeña validacion */
if(!$id){

  die('no es valido');
}



$resultado = obtenerContacto($id);
$contacto = $resultado->fetch_assoc(); /** para que nos traiga los resultados y se almacenen en contacto */
?>




<div class="contenedor-barra">
<div class="contenedor barra">
    <a href="index.php"  class="btn volver">Volver</a>

  <h1>Editar Contacto</h1>    

</div>  
</div>

<div class="bg_amarillo contenedor sombra">
<form id="contacto"    action="#">
<legend>Edite el Contacto</legend>

<?php include 'inc/layout/formulario.php';?>


</form>

</div>




<?php include 'inc/layout/footer.php';?>

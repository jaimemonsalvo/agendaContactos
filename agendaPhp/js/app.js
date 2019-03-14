/*utilizaremos la nueva sintaxis*/


const formularioContactos = document.querySelector('#contacto'),
      listadoContactos = document.querySelector('#listado-contactos tbody'),
      inputBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners(){
/*Cuando el formulario de crear o editar se ejecuta*/

   formularioContactos.addEventListener('submit', leerFormulario);


/* listener para eliminar un boton*/

  if(listadoContactos){
    listadoContactos.addEventListener('click', eliminarContacto);

     }

         /**Buscador */
         inputBuscador.addEventListener('input', buscarContactos);
         /** llamae funcion mostrar numero de contactos */
         numeroContactos();
}


function leerFormulario(e){
e.preventDefault(); /**se ejecuta esta linea para prevenir el default, sobretodo al trabajar con formularios+JS+AJAX */

/**leer los datos de los inputs */

const nombre =document.querySelector('#nombre').value,
empresa =document.querySelector('#empresa').value,
telefono =document.querySelector('#telefono').value,
accion =document.querySelector('#accion').value;

    if (nombre===''||empresa===''||telefono==='' ){
                /** 2 parametros:texto y clase */
    
            mostrarNotificacion('Todos los campos son obligatorios', 'error');
        }else{

            /*pasa la validacion para ser  llamado a ajax*/

            const infoContacto =new FormData();
            infoContacto.append('nombre', nombre);
            infoContacto.append('empresa', empresa);
            infoContacto.append('telefono', telefono);
            infoContacto.append('accion', accion);
              
    
            if (accion ==='crear'){

            /**crearemos un elemento */
                    
            insertarBD(infoContacto); 

          }else{
                /**editar el elemento */

                /**leer el id */

                let idRegistro = document.querySelector('#id').value;
                infoContacto.append('id',idRegistro);
                actualizarRegistro(infoContacto);


               
             }

        }

}


/** INSERTAR EN LA BASE DE DATOS VIA AJAX*/

function insertarBD(datos){
           
     //LLAMADO AJAX
     //CREAR EL OBJETO
     const xhr = new XMLHttpRequest();
     //ABRIR LA CONEXION
     xhr.open('POST','inc/modelos/modeloContactos.php', true);
     //PASAR LOS DATOS 
     xhr.onload = function(){
         if(this.status===200){
            
             /**leeemos la respuesta de php*/
             let respuesta =JSON.parse((xhr.responseText));
             
             console.log(respuesta);
             /** INSERTAR UN NUEVO ELEMENTO A LA TABLA*/
             let nuevoContacto = document.createElement('tr');
             nuevoContacto.innerHTML = `
             <td>${respuesta.datos.nombre}</td>
             <td>${respuesta.datos.empresa}</td>
             <td>${respuesta.datos.telefono}</td>
             `;

             /*crear contenedor para los botones*/

             const contenedorAcciones = document.createElement('td');

             /**crear el icono de editar */

             const iconoEditar = document.createElement('i');
             iconoEditar.classList.add('fas','fa-pen-square');
             /**crear el enlace para editar */

             const btnEditar = document.createElement('a');
             btnEditar.appendChild(iconoEditar);
             btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
             btnEditar.classList.add('btn', 'btn-editar');

             /**AGREGARLO AL PADRE */

             contenedorAcciones.appendChild(btnEditar);

             /**CREAR EL ICONO DE ELIMINAR */

             const iconoEliminar = document.createElement('i');
             iconoEliminar.classList.add('fas','fa-trash-alt');

             /**CREAR EL BOTON ELIMINAR */

             const btnEliminar = document.createElement('button');
             btnEliminar.appendChild(iconoEliminar);
             btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
             btnEliminar.classList.add('btn','btn-borrar');

             /**AGREGARLO AL PADRE */

             contenedorAcciones.appendChild(btnEliminar);

             /**AGREGARLO AL TR */

             nuevoContacto.appendChild(contenedorAcciones);
      
                     /**AGREGARLO CON LOS CONTACTOS */

                     listadoContactos.appendChild(nuevoContacto);
                     

                     /**RESETEAR EL FORMULARIO */

                     document.querySelector('form').reset();

                     /**MOSTRAR LA NOTIFICACION */

                     mostrarNotificacion('Contacto Creado Correctamente','correcto')
                        /**actualizar el numero */
                     numeroContactos();


         }
     }
     //ENVIAR LOS DATOS
     xhr.send(datos);
}

/**Funcion para actualizar los registros de editar */

            function actualizarRegistro(datos){
                    /**operaciones de ajax */
                                   //LLAMADO AJAX
                                    const xhr = new XMLHttpRequest();
                                    xhr.open('POST','inc/modelos/modeloContactos.php', true);
                                    xhr.onload = function() {
                                        if(this.status === 200){
                                            const respuesta = JSON.parse(xhr.responseText);
                                                    
                                            if(respuesta.respuesta === 'correcto'){
                                                mostrarNotificacion('Contacto Editado Correctamente', 'correcto');
                                            } else{
                                                mostrarNotificacion('Hubo un Error...', 'error');
                                            }
                                            //Despues de 3 segundos redireccionar

                                            setTimeout(() => {
                                                window.location.href = 'index.php';
                                            }, 4000);
                                        }
                                    }
     
                                            xhr.send(datos);
                     }
   
    /**ELIMINAR CONCTACTO */


    function eliminarContacto(e){


        if (e.target.parentElement.classList.contains('btn-borrar')==true){  /**con parentElement nos referimos al padre y no al hijo */
               /**tomar el ID */

               const id = e.target.parentElement.getAttribute('data-id');

               /**preguntar al ususario si esta seguro, utilizamos la confirmacion nativa del navegador */

               const respuesta = confirm('¿Estas Seguro (a) ?');

               if (respuesta){
                 /**LLamado a ajax */

                 /**Crear el objeto */

                const xhr=new XMLHttpRequest();
                 /**abrir la conexion */
                 xhr.open('GET',`inc/modelos/modeloContactos.php?id=${id}&accion=borrar`,true);   /**EN ESTE CASO GET, POR QUE VAMOS A EXTRAER UN DATO DE LA BASE DE DATOS */
                 /**leer la respuesta  */
                 xhr.onload = function(){

                    if(xhr.status==200 ){

                        
                        const resultado=JSON.parse(xhr.responseText);

                        console.log(resultado);
                        
                        if (resultado.respuesta==='correcto') {
                            /**eliminar el registro del DOM */
                          e.target.parentElement.parentElement.parentElement.remove();
                            /**Mostrar notificacion */
                            mostrarNotificacion('Contacto eliminado','correcto');
                            
                                  /**actualizar el numero */
                                   numeroContactos();

                        }else{
                            /**Mostrar una notificacion */
                            mostrarNotificacion('Hubo un error...', 'error');
                        }
                    }

                 }
                 /**enviar la peticion */
                 xhr.send();
                
               } 
  

        }          
    }


            /**NoTIFICACION EN PANTALLA */

            function mostrarNotificacion(mensaje,clase){

                const notificacion=document.createElement('div');
                notificacion.classList.add(clase,'notificacion', 'sombra');
                notificacion.textContent=mensaje;

                /**Formulario */

                formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

                /**OCULTAR Y MOSTRAR LA NOTIFICACION */

                setTimeout(() => {
                    notificacion.classList.add('visible'); /**va a esperar un timepo de 100 ms y se le va agregar una clase 'visible'  */
                
                    setTimeout(() => {
                    notificacion.classList.remove('visible');

                /**lo removemos una vez ya no lo utilizamos con la finalidad de liberar espacio */
                    
                    setTimeout(() => {
                            notificacion.remove();
                    }, 500);
                    

                
                }, 3000);      /**Despues de 3 segundos la vamos a quitar */

                }, 100);

            }

            /**Buscar Contactos */

            function buscarContactos(e){
                const expresion = new RegExp(e.target.value,"i"),      /**la i que se agrega sirve para que no diferencie minuscula y mayuscula */
                      registros = document.querySelectorAll('tbody tr');
                      registros.forEach(registro => {
                        registro.style.display = 'none';
                            console.log(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1)
                        if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1){
                            registro.style.display = 'table-row';
                        }

                        numeroContactos();
                      })

            }

            /**Muestra el Numero de contactos */

            function numeroContactos(){
                const totalContactos = document.querySelectorAll('tbody tr'),
                    contendorNumero = document.querySelector('.total-contactos span');
                let total=0;

                totalContactos.forEach(contacto=>{
                    if(contacto.style.display === '' || contacto.style.display ==='table-row'){
                        total++;
                    }

                });
                /*console.log(total);*/
                contendorNumero.textContent = total;
            }
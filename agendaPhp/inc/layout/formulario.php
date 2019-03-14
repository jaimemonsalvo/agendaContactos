
            <div class="campos">

            <div class="campo">
            <label for="nombre">Nombre:</label>
            <input
            type="text" 
            id="nombre"
            placeholder="Nombre Contacto"
            value="<?php echo ($contacto['nombre']) ? $contacto['nombre'] : '';   ?>" 

            >
             <!--arriba en el value, hacemos una especie de if, si en la casilla aparece $contacto['nombre'] entonces (?) escribalo de lo contrario deje vacio-->
            </div>

              <div class="campo">
              <label for="empresa">Empresa:</label>
            <input 
            type="text"  
            id="empresa" 
            placeholder="Nombre Empresa"
            value="<?php echo ($contacto['empresa']) ? $contacto['empresa'] : '';   ?>"
            >
            </div>

            <div class="campo">
            <label for="telefono">Telefóno:</label>
            <input
             type="tel" 
              id="telefono" 
              placeholder="Numero Telefono"
              value="<?php echo ($contacto['telefono']) ? $contacto['telefono'] : '';   ?>"
              >

            </div>

        </div>
          <div class="campo enviar">
            <?php 
            $textoBtn = ($contacto['telefono']) ? 'Guardar' : 'Añadir';
            $accion = ($contacto['telefono']) ? 'editar' : 'crear';
            ?>
            <input type="hidden" id="accion" value="<?php echo $accion; ?>">
            <?php if(isset( $contacto['id'] )) { ?>
                <input type="hidden" id="id" value="<?php echo $contacto['id']; ?>">
            <?php } ?>
            <input type="submit" value="<?php echo $textoBtn; ?>">
          </div>
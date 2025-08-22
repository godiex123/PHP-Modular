$(document).ready(function(){
    // Sumar inputs de MontoPecuniario
    $(function() {
        /**
         * Suma de los campos y porcentaje
         */
        $(".monto_no_pecuniario, .monto_pecuniario").keyup(function() {
            var a       = $(".monto_no_pecuniario").val(),
                b       = $(".monto_pecuniario").val(),
                sum     = +a + +b;
            $(".total_pecuniarios").val(sum);
        })
        $("body").on("keyup", ".monto_no_pecuniario2, .monto_pecuniario2", function(){
            var a       = $(".monto_no_pecuniario2").val(),
                b       = $(".monto_pecuniario2").val(),
                sum     = (+a) + (+b);
            $(".total_pecuniarios2").val(sum);
        })
        $("body").on("keyup", ".monto_no_pecuniario3, .monto_pecuniario3", function(){
            var a       = $(".monto_no_pecuniario3").val(),
                b       = $(".monto_pecuniario3").val(),
                sum     = (+a) + (+b);
            $(".total_pecuniarios3").val(sum);
        })
        $("body").on("keyup", ".monto_no_pecuniario4, .monto_pecuniario4", function(){
            var a       = $(".monto_no_pecuniario4").val(),
                b       = $(".monto_pecuniario4").val(),
                sum     = (+a) + (+b);
            $(".total_pecuniarios4").val(sum);
        })
        $("body").on("keyup", ".monto_no_pecuniario5, .monto_pecuniario5", function(){
            var a       = $(".monto_no_pecuniario5").val(),
                b       = $(".monto_pecuniario5").val(),
                sum     = (+a) + (+b)
            $(".total_pecuniarios5").val(sum);
        })

        /**
         * Aqui va el JQuery para la suma total de los campos
         */
        $("body").on("keyup", ".mnp", function(){
            var sum = 0;
            $(".mnp").each(function(){
                var value = $(this).val();
                if(!isNaN(value) && value.length != 0) {
                    sum += +value;
                }
            })
            $("#total_monto_no_pecuario").val(sum);    
        })
        $("body").on("keyup", ".mp", function(){
            var sum = 0;
            $(".mp").each(function(){
                var value = $(this).val();
                if(!isNaN(value) && value.length != 0) {
                    sum += +value;
                }
            })
            $("#total_monto_pecuario").val(sum);    
        })
        $("body").on("keyup", ".mnp, .mp", function(){
            var sum = 0;
            $(".tp").each(function(){
                var value = $(this).val();
                if(!isNaN(value) && value.length != 0) {
                    sum += +value;
                }
            })
            $("#suma_total_pecuarios").val(sum);
            // Primero slot
            $(".porcentaje_pecuniarios").val(
                ((+$(".total_pecuniarios").val() * 100) / +$("#suma_total_pecuarios").val()).toFixed(2)
            );  
            // Segundo slot
            $(".porcentaje_pecuniarios2").val(
                ((+$(".total_pecuniarios2").val() * 100) / +$("#suma_total_pecuarios").val()).toFixed(2)  
            );
            // Tercer slot
            $(".porcentaje_pecuniarios3").val(
                ((+$(".total_pecuniarios3").val() * 100) / +$("#suma_total_pecuarios").val()).toFixed(2)  
            );
            // Cuarto slot
            $(".porcentaje_pecuniarios4").val(
                ((+$(".total_pecuniarios4").val() * 100) / +$("#suma_total_pecuarios").val()).toFixed(2)  
            );    
            // Quinto slot
            $(".porcentaje_pecuniarios5").val(
                ((+$(".total_pecuniarios5").val() * 100) / +$("#suma_total_pecuarios").val()).toFixed(2)  
            );
        })
            $("body").on("keyup", ".mnp, .mp", function(){
            var sum = 0;
            $(".pp").each(function(){
                var value = $(this).val();
                if(!isNaN(value) && value.length != 0) {
                    sum += +value;
                }
            })
            $("#total_porcentaje_pecuarios").val(sum.toFixed(2));    
        })
    });

    /*
    function addResponsable() {
        var nro     = document.getElementsByClassName('tdresponsable').length + 1;
        console.log(nro);
        if(nro > 1) {
            document.getElementById('remover_res').setAttribute('style', 'display: inline;');
        }
        if (nro > 4) {
            document.getElementById('agregar_res').setAttribute('style', 'display: none;');
        }
        if (nro <= 5) {
            $('#tabla-responsables').append(
                '<tr id="contador_responsable'+nro+'">\
                    <td class="tdresponsable">\
                        <input class="nombre_responsable" placeholder="Nombre completo" name="nombre_completo_responsable_proyecto'+nro+'" id="nombre_completo_responsable_proyecto" />\
                    </td>\
                    <td>\
                        <input class="rut_responsable" placeholder="Rut" name="rut_responsable_proyecto'+nro+'" id="rut_responsable_proyecto" />\
                    </td>\
                    <td>\
                        <input class="email_responsable" type="email" placeholder="Correo Electrónico" name="email_responsable_proyecto'+nro+'" id="email_responsable_proyecto" />\
                    </td>\
                    <td>\
                        <input class="cargo_responsable" placeholder="Cargo que desempeña" name="cargo_responsable_proyecto'+nro+'" id="cargo_responsable_proyecto"/>\
                    </td>\
                    <td>\
                        <select class="facultad_responsable" name="facultad_responsable_proyecto'+nro+'" id="facultad_responsable_proyecto" >\
                            <option value="">Seleccione</option>\
                    <?php  foreach($obj->facultades() as $row) { ?>\
                            <option value="<?= $row["id_facultad"]; ?>"><?= $row["nombre_facultad"]; ?></option>\
                    <?php } ?>\
                        </select>\
                    </td>\
                    <td>\
                        <select class="sede_responsable" name="sede_responsable_proyecto'+nro+'" id="sede_responsable_proyecto" >\
                            <option value="">Seleccione</option>\
                    <?php  foreach($obj->sedes() as $row) { ?>\
                            <option value="<?= $row["id_sede"]; ?>"><?= $row["nombre_sede"]; ?></option>\
                    <?php } ?>\
                        </select>\
                    </td>\
                </tr>'
            );
        }
    }

    function removeResponsable() {
        var nro         = document.getElementsByClassName('tdresponsable').length;

        if (nro > 1) {
            document.getElementById('agregar_res').setAttribute('style', 'display: inline;');
            $('#contador_responsable'+nro).remove();
        }
        if (nro == 2) {
            document.getElementById('remover_res').setAttribute('style', 'display: none;');
        }

    }*/

    $("body").on("click", "#agregar_entidad", addEntidad);
    function addEntidad() {
        var nro = document.getElementsByClassName('tdentidad').length + 1;

        if(nro > 1) {
            document.getElementById('remover_entidad').setAttribute('style', 'display: inline;');
        }
        if (nro > 9) {
            document.getElementById('agregar_entidad').setAttribute('style', 'display: none;');
        }
        if (nro <= 10) {
            $('#tabla-entidades').append(
                '<tr id="contador_entidad'+nro+'">\
                    <td class="tdentidad">\
                        <input class="entidad" placeholder="Entidades participantes" name="entidades_participantes'+nro+'" />\
                    </td>\
                    <td>\
                        <input class="presupuestario" placeholder="Concepto presupuestario" name="concepto_presupuestario'+nro+'" />\
                    </td>\
                    <td>\
                        <input class="monto_no_pecuniario'+nro+' mnp" type="number" min="0" placeholder="Monto no pecuniario" name="monto_no_pecuniario'+nro+'" />\
                    </td>\
                    <td>\
                        <input class="monto_pecuniario'+nro+' mp" type="number" min="0" placeholder="Monto pecuniario" name="monto_pecuniario'+nro+'" />\
                    </td>\
                    <td>\
                        <input class="total_pecuniarios'+nro+' tp" type="number" placeholder="Total" name="total_pecuniarios'+nro+'" readonly/>\
                    </td>\
                    <td>\
                        <input class="porcentaje_pecuniarios'+nro+' pp" type="number" placeholder="Porcentaje" name="porcentaje_pecuniarios'+nro+'" readonly/>\
                    </td>\
                </tr>'
            );
        }
    }

    $("body").on("click", "#remover_entidad", removeEntidad);
    function removeEntidad() {
        var nro         = document.getElementsByClassName('tdentidad').length;

        if (nro > 1) {
            document.getElementById('agregar_entidad').setAttribute('style', 'display: inline;');
            $('#contador_entidad'+nro).remove();
        }
        if (nro == 2) {
            document.getElementById('remover_entidad').setAttribute('style', 'display: none;');
        }

        var sum = 0;
        $(".mnp").each(function(){
            var value = $(this).val();
            if(!isNaN(value) && value.length != 0) {
                sum += +value;
            }
        })
        $("#total_monto_no_pecuario").val(sum); 
        var sum = 0;
        $(".mp").each(function(){
            var value = $(this).val();
            if(!isNaN(value) && value.length != 0) {
                sum += +value;
            }
        })
        $("#total_monto_pecuario").val(sum); 
        var sum = 0;
        $(".tp").each(function(){
            var value = $(this).val();
            if(!isNaN(value) && value.length != 0) {
                sum += +value;
            }
        })
        $("#suma_total_pecuarios").val(sum);

        // Primero slot
        $(".porcentaje_pecuniarios").val(
            ((+$(".total_pecuniarios").val() * 100) / +$("#suma_total_pecuarios").val()).toFixed(2)
        );  
        // Segundo slot
        $(".porcentaje_pecuniarios2").val(
            ((+$(".total_pecuniarios2").val() * 100) / +$("#suma_total_pecuarios").val()).toFixed(2)  
        );
        // Tercer slot
        $(".porcentaje_pecuniarios3").val(
            ((+$(".total_pecuniarios3").val() * 100) / +$("#suma_total_pecuarios").val()).toFixed(2)  
        );
        // Cuarto slot
        $(".porcentaje_pecuniarios4").val(
            ((+$(".total_pecuniarios4").val() * 100) / +$("#suma_total_pecuarios").val()).toFixed(2)  
        );    
        // Quinto slot
        $(".porcentaje_pecuniarios5").val(
            ((+$(".total_pecuniarios5").val() * 100) / +$("#suma_total_pecuarios").val()).toFixed(2)  
        );

        var sum = 0;
        $(".pp").each(function(){
            var value = $(this).val();
            if(!isNaN(value) && value.length != 0) {
                sum += +value;
            }
        })
        $("#total_porcentaje_pecuarios").val(sum.toFixed(0));
    }

    $("body").on("click", "#agregar_equipo", addEquipo);
    function addEquipo() {
        var nro = document.getElementsByClassName('tdequipo').length + 1;

        if(nro > 1) {
            document.getElementById('remover_equipo').setAttribute('style', 'display: inline;');
        }
        if (nro > 9) {
            document.getElementById('agregar_equipo').setAttribute('style', 'display: none;');
        }
        if (nro <= 10) {
            $('#tabla-equipo').append(
                '<tr id="contador_equipo'+nro+'">\
                    <td class="tdequipo">\
                        <input placeholder="Registrar al responsable" name="nombre_responsable'+nro+'" />\
                    </td>\
                    <td>\
                        <input placeholder="Función" name="funcion'+nro+'" id="funcion" />\
                    </td>\
                    <td>\
                        <input placeholder="Tipo de contrato"  name="tipo_contrato'+nro+'" id="tipo_contrato"/>\
                    </td>\
                    <td>\
                        <input type="number" min="0" placeholder="Monto"  name="monto'+nro+'" id="monto" />\
                    </td>\
                    <td>\
                        <input type="number" min="0" placeholder="Al proyecto" name="horas_dedicadas'+nro+'" id="horas_dedicadas" />\
                    </td>\
                    <td style="vertical-align:middle; text-align:center">\
                        <label class="radio-inline" style="width:10%;"><input type="radio" value="0" name="participacion_otros_proyectos'+nro+'" checked>No</label>\
                        <label class="radio-inline" style="width:10%; margin-left:20%;"><input type="radio" value="1" name="participacion_otros_proyectos'+nro+'">Si</label>\
                    </td>\
                </tr>'
            );
        }
    }

    $("body").on("click", "#remover_equipo", removeEquipo);
    function removeEquipo() {
        var nro         = document.getElementsByClassName('tdequipo').length;

        if (nro > 1) {
            document.getElementById('agregar_equipo').setAttribute('style', 'display: inline;');
            $('#contador_equipo'+nro).remove();
        }
        if (nro == 2) {
            document.getElementById('remover_equipo').setAttribute('style', 'display: none;');
        }    
    }


    $("body").on("click", "#guardar_progreso", function(){
        var np = $("#nombre_proyecto"),
            rp = $("#resumen_proyecto"),
            nr = $("#nombre_completo_responsable_proyecto"),
            rr = $("#rut_responsable_proyecto"),
            em = $("#email_responsable_proyecto"),
            ca = $("#cargo_responsable_proyecto"),
            fa = $("#facultad_responsable_proyecto"),
            se = $("#sede_responsable_proyecto");

            ep = $("#entidades_participantes"),
            cp = $("#concepto_presupuestario"),
            mn = $(".monto_no_pecuniario"),
            mp = $(".monto_pecuniario");


        np.removeAttr('required'),
        rp.removeAttr('required'),
        nr.removeAttr('required'),
        rr.removeAttr('required'),
        em.removeAttr('required'),
        ca.removeAttr('required'),
        fa.removeAttr('required'),
        se.removeAttr('required');

        ep.removeAttr('required'),
        cp.removeAttr('required'),
        mn.removeAttr('required'),
        mp.removeAttr('required');

        $("#guardar_progreso_submit").click();
    })
})
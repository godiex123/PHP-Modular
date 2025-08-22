$(document).ready(function(){

     // Validación de porcentajes
     $(document).on('input', 'input[name="porcentaje[]"]', function() {
        let value = parseInt(this.value);
        if (value > 100) {
            this.value = 100;
        } else if (value < 0) {
            this.value = 0;
        }
    });

    // Función para validar la suma de porcentajes
    function validarSumaPorcentajes(inputActual) {
        const inputs = document.querySelectorAll('input[name="porcentaje[]"]');
        let suma = 0;
        
        inputs.forEach(input => {
            if (input.value) {
                suma += parseInt(input.value) || 0;
            }
        });

        if (suma > 100) {
            alert('La suma de los porcentajes no puede superar el 100%');
            inputActual.value = '';
            return false;
        }
        return true;
    }

    // Validación en tiempo real de porcentajes
    $(document).on('input', 'input[name="porcentaje[]"]', function() {
        let value = parseInt(this.value) || 0;
        
        // Validar valor individual
        if (value > 100) {
            this.value = 100;
        } else if (value < 0) {
            this.value = 0;
        }
        
        // Validar suma total
        validarSumaPorcentajes(this);
    });

    // Validar antes del envío del formulario
    $('#formularioPostulacion').on('submit', function(e) {
        const inputs = document.querySelectorAll('input[name="porcentaje[]"]');
        let suma = 0;
        
        inputs.forEach(input => {
            suma += parseInt(input.value) || 0;
        });

        if (suma > 100) {
            e.preventDefault();
            alert('La suma de los porcentajes no puede superar el 100%');
            return false;
        }
        
        if (suma < 100) {
            e.preventDefault();
            alert('La suma de los porcentajes debe ser igual a 100%');
            return false;
        }
    });

    const selectCoautores = document.getElementById("cantidad_coautores");

    $("body").on("click", "#agregar_entidad", addEntidad);
    function addCoautor(cantidad) {

        // Guardamos el nombre del solicitante antes de limpiar la tabla
        let nombreSolicitante = $("#nombre_solicitante").val().trim();
        if (!nombreSolicitante) nombreSolicitante = "Solicitante";

        // Empezamos limpiando el lugar
        document.getElementById("contenedor-coautores").innerHTML = '';
        document.getElementById("tabla-distribucion").innerHTML = `<tr>
                    <th class="TextoCentro"></th>
                    <th class="TextoCentro">Porcentaje del monto solicitado (%)</th>
                </tr>
                <tr>
                    <th class="TextoCentro" id="autor-solicitante">${nombreSolicitante}</th>
                    <td>
                        <input type="number" min="0" placeholder="Porcentaje" name="porcentaje[]" id="porcentaje" required>
                    </td>
                </tr>`;
        // Validamos la cantidad de coautores seleccionados
        if(cantidad > 0) {
            for(i = 1; i <= cantidad; i++) {
                let coautorId = `nombre_coautor_${i}`;
                let tabla = `<br>
                    <p><b>Coautor/a ${i}</b></p>
                    <table id="tabla-coautor-${i}">
                        <tr>
                            <th class="TextoCentro" style="width:20%;">Nombre: (*)</th>
                            <td>
                                <input type="text" class="nombre-coautor" name="nombre_coautor[]" id="${coautorId}" required>
                            </td>
                        </tr>
                        <tr>
                            <th class="TextoCentro">Rut: (*)</th>
                            <td>
                                <input type="text" name="rut_coautor[]" id="rut${i}" placeholder="Con puntos, guión y dígito verificador" required>
                                <span class="error" id="error-rut${i}"></span>
                            </td>
                        </tr>
                        <tr>
                            <th class="TextoCentro">Correo Electrónico: (*)</th>
                            <td>
                                <input type="email" name="correo_coautor[]" id="email_coautor" required>
                            </td>
                        </tr>
                        <tr>
                            <th class="TextoCentro">ORCID: (*)</th>
                            <td>
                                <input type="text" name="orcid_coautor[]" id="orcid_coautor" required>
                            </td>
                        </tr>
                        <tr>
                            <th class="TextoCentro">Repositorio UCEN:</th>
                            <td>
                                <input type="text" name="repositorio_ucen_coautor[]" id="repositorio_ucen_coautor">
                            </td>
                        </tr>
                        <tr>
                            <th class="TextoCentro">Perfil Scopus:</th>
                            <td>
                                <input type="text" name="perfil_scopus_coautor[]" id="perfil_scopus_coautor">
                            </td>
                        </tr>
                        <tr>
                            <th class="TextoCentro">Perfil WoS (ResearchID):</th>
                            <td>
                                <input type="text" name="perfil_wos_coautor[]" id="perfil_wos_coautor">
                            </td>
                        </tr>
                        <tr>
                            <th class="TextoCentro">Modalidad: (*)</th>
                            <td>
                                <select name="id_modalidad_coautor[]" id="id_modalidad_coautor" required>
                                    <option value="">Seleccione</option>
                                    <option value="1">Jornada Completa</option>
                                    <option value="2">Media Jornada</option>
                                    <option value="3">Honorarios</option>
                                    <option value="4">Estudiante Regular</option>
                                    <option value="5">3/4 Jornada</option>
                                    <option value="6">Jornada Parcial</option>
                                </select>
                            </td>
                        </tr>
                    </table>`;
                document.getElementById("contenedor-coautores").innerHTML += tabla;

                let distribucion = `
                <tr>
                    <th class="TextoCentro" id="autor-${i}">Coautor/a ${i}</th>
                    <td>
                        <input type="number" min="0" placeholder="Porcentaje" name="porcentaje[]" id="porcentaje" required>
                    </td>
                </tr>`;
                document.getElementById("tabla-distribucion").innerHTML += distribucion;
            }
        }
    }

        // Evento para actualizar la tabla de distribución cuando se escribe en los nombres de los coautores
        $(document).on("input", ".nombre-coautor", function () {
            let index = $(this).attr("id").split("_").pop();
            let nombre = $(this).val().trim();
            $("#autor-" + index).text(nombre ? nombre : `Coautor/a ${index}`);
        });
    
        // También actualizar el nombre del solicitante en la tabla de distribución
        $("#nombre_solicitante").on("input", function () {
            let nombre = $(this).val().trim();
            $("#autor-solicitante").text(nombre ? nombre : "Solicitante");
        });
    
        // Cuando el usuario cambia la cantidad de coautores, se genera la tabla con los nombres actualizados
        selectCoautores.addEventListener("change", function () {
            addCoautor(this.value);
        });
    

    selectCoautores.addEventListener("change", function(){
        addCoautor(this.value);

        const inputsRUT = document.querySelectorAll(".rut-input");

        inputsRUT.forEach((input) => {
          input.addEventListener("input", function () {
            const rut = input.value;
            const errorSpan = document.getElementById(`error-${input.id}`);

            if (validarRUT(rut)) {
              input.style.borderColor = "green"; // Indica que el RUT es válido
              errorSpan.textContent = "";
            } else {
              input.style.borderColor = "red"; // Indica que el RUT es inválido
              errorSpan.textContent = "RUT inválido ❌";
              errorSpan.style.color = "red";
            }
          });
        });
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
        if (nro > 4) {
            document.getElementById('agregar_entidad').setAttribute('style', 'display: none;');
        }
        if (nro <= 5) {
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
        if (nro > 4) {
            document.getElementById('agregar_equipo').setAttribute('style', 'display: none;');
        }
        if (nro <= 5) {
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

    // VALIDACION DE RUT
    function validarFormatoRUT(rut) {
      // Expresión regular para validar el formato del RUT: xxxx.xxx.xxx-x
      const regex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/;
      return regex.test(rut);
    }

    function limpiarRUT(rut) {
      return rut.replace(/\./g, "").replace("-", "");
    }

    function calcularDigitoVerificador(rut) {
      let suma = 0;
      let multiplicador = 2;

      // Se invierte el RUT para aplicar el algoritmo de cálculo
      for (let i = rut.length - 1; i >= 0; i--) {
        suma += parseInt(rut[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
      }

      const residuo = 11 - (suma % 11);
      if (residuo === 11) {
        return "0";
      } else if (residuo === 10) {
        return "K";
      } else {
        return String(residuo);
      }
    }

    function validarRUT(rut) {
      if (!validarFormatoRUT(rut)) {
        return false;
      }

      // Limpia el RUT de puntos y guion
      const rutSinFormato = limpiarRUT(rut);

      // Separamos el número del dígito verificador
      const rutNumero = rutSinFormato.slice(0, -1);
      const digitoVerificador = rutSinFormato.slice(-1).toUpperCase();

      // Calculamos el dígito verificador y lo comparamos
      return calcularDigitoVerificador(rutNumero) === digitoVerificador;
    }

    const inputRUT = document.getElementById("rut_solicitante");
    const resultado = document.getElementById("resultado");

    // Función para validar en tiempo real
    inputRUT.addEventListener("input", function () {
    const rut = inputRUT.value;

    if (validarRUT(rut)) {
        inputRUT.classList.remove("error");
        inputRUT.classList.add("valid");
        resultado.textContent = "";
    } else {
        inputRUT.classList.remove("valid");
        inputRUT.classList.add("error");
        resultado.textContent = "RUT inválido ❌";
        resultado.style.color = "red";
    }
    });

      // 🔹 Validar RUT de coautores
  $(document).on("input", "input[name^='rut_coautor']", function () {
    const rutSolicitante = limpiarRUT($("#rut_solicitante").val());
    const rutActual = limpiarRUT($(this).val());
    let errorMsg = "";

    if (!validarRUT($(this).val())) {
      errorMsg = "❌ RUT inválido";
    } else if (rutActual === rutSolicitante) {
      errorMsg = "⚠️ No puede repetir al solicitante";
    } else {
      let duplicado = false;
      $("input[name^='rut_coautor']").each(function () {
        if ($(this).attr("id") !== this.id && limpiarRUT($(this).val()) === rutActual) {
          duplicado = true;
        }
      });

      if (duplicado) {
        errorMsg = "⚠️ RUT duplicado entre coautores";
      }
    }

    const errorSpan = $(this).siblings(".error");
    $(this).css("border-color", errorMsg ? "red" : "green");
    errorSpan.text(errorMsg);
  });

    // Validar antes de enviar el formulario
    document
      .getElementById("formularioPostulacion")
      .addEventListener("submit", function (event) {
        const rut = inputRUT.value;

        if (!validarRUT(rut)) {
          event.preventDefault(); // Evitar el envío del formulario si el RUT no es válido
          inputRUT.classList.add("error");
          resultado.textContent = "Por favor ingrese un RUT válido.";
          resultado.style.color = "red";
        }
      });
})
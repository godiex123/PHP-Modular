$(document).ready(function(){

  //console.log("🚀 Cargando nombres de coautores en la tabla de distribución...");

  function actualizarDistribucion() {
      let coautores = {};

      // 1️⃣ Mapear los nombres de coautores existentes (de PHP)
      $("input[name='nombre_coautor[]']").each(function () {
          let index = $(this).closest("div[id^='coautor_']").attr("id").split("_").pop();
          coautores[index] = $(this).val().trim();
      });

      // 1.1️⃣ Agregar el solicitante (ID 0)
      let nombreSolicitante = $("#nombre_solicitante").val().trim();
      coautores["0"] = nombreSolicitante ? nombreSolicitante : "Solicitante";

      //console.log("📌 Mapa de coautores cargados:", coautores);

      // 2️⃣ Recorrer la tabla de distribución y actualizar los nombres
      $("#tabla-distribucion tr").each(function () {
          let numeroAutor = $(this).find("input[name='id_distribucion[]']").val();

          if (numeroAutor !== undefined && coautores[numeroAutor]) {
              let thElement = $(this).find("th");
              thElement.text(coautores[numeroAutor]); // jQuery
              thElement.get(0).innerText = coautores[numeroAutor]; // Método nativo
              //console.log(`✅ Nombre actualizado: ${coautores[numeroAutor]} en la fila ${numeroAutor}`);
          }
      });
  }

  // 🔹 Ejecutar al cargar la página
  setTimeout(actualizarDistribucion, 1000);

  // 🔹 Detectar cambios en los nombres de coautores y actualizar la tabla en tiempo real
  $(document).on("input", "input[name='nombre_coautor[]'], #nombre_solicitante", function () {
      actualizarDistribucion();
  });


  // Sumar inputs de MontoPecuniario
  $(function () {
    /**
     * Suma de los campos y porcentaje
     */
    $(".monto_no_pecuniario, .monto_pecuniario").keyup(function () {
      var a = $(".monto_no_pecuniario").val(),
        b = $(".monto_pecuniario").val(),
        sum = +a + +b;
      $(".total_pecuniarios").val(sum);
    });
    $("body").on(
      "keyup",
      ".monto_no_pecuniario2, .monto_pecuniario2",
      function () {
        var a = $(".monto_no_pecuniario2").val(),
          b = $(".monto_pecuniario2").val(),
          sum = +a + +b;
        $(".total_pecuniarios2").val(sum);
      }
    );
    $("body").on(
      "keyup",
      ".monto_no_pecuniario3, .monto_pecuniario3",
      function () {
        var a = $(".monto_no_pecuniario3").val(),
          b = $(".monto_pecuniario3").val(),
          sum = +a + +b;
        $(".total_pecuniarios3").val(sum);
      }
    );
    $("body").on(
      "keyup",
      ".monto_no_pecuniario4, .monto_pecuniario4",
      function () {
        var a = $(".monto_no_pecuniario4").val(),
          b = $(".monto_pecuniario4").val(),
          sum = +a + +b;
        $(".total_pecuniarios4").val(sum);
      }
    );
    $("body").on(
      "keyup",
      ".monto_no_pecuniario5, .monto_pecuniario5",
      function () {
        var a = $(".monto_no_pecuniario5").val(),
          b = $(".monto_pecuniario5").val(),
          sum = +a + +b;
        $(".total_pecuniarios5").val(sum);
      }
    );

    /**
     * Aqui va el JQuery para la suma total de los campos
     */
    $("body").on("keyup", ".mnp", function () {
      var sum = 0;
      $(".mnp").each(function () {
        var value = $(this).val();
        if (!isNaN(value) && value.length != 0) {
          sum += +value;
        }
      });
      $("#total_monto_no_pecuario").val(sum);
    });
    $("body").on("keyup", ".mp", function () {
      var sum = 0;
      $(".mp").each(function () {
        var value = $(this).val();
        if (!isNaN(value) && value.length != 0) {
          sum += +value;
        }
      });
      $("#total_monto_pecuario").val(sum);
    });
    $("body").on("keyup", ".mnp, .mp", function () {
      var sum = 0;
      $(".tp").each(function () {
        var value = $(this).val();
        if (!isNaN(value) && value.length != 0) {
          sum += +value;
        }
      });
      $("#suma_total_pecuarios").val(sum);
      // Primero slot
      $(".porcentaje_pecuniarios").val(
        (
          (+$(".total_pecuniarios").val() * 100) /
          +$("#suma_total_pecuarios").val()
        ).toFixed(2)
      );
      // Segundo slot
      $(".porcentaje_pecuniarios2").val(
        (
          (+$(".total_pecuniarios2").val() * 100) /
          +$("#suma_total_pecuarios").val()
        ).toFixed(2)
      );
      // Tercer slot
      $(".porcentaje_pecuniarios3").val(
        (
          (+$(".total_pecuniarios3").val() * 100) /
          +$("#suma_total_pecuarios").val()
        ).toFixed(2)
      );
      // Cuarto slot
      $(".porcentaje_pecuniarios4").val(
        (
          (+$(".total_pecuniarios4").val() * 100) /
          +$("#suma_total_pecuarios").val()
        ).toFixed(2)
      );
      // Quinto slot
      $(".porcentaje_pecuniarios5").val(
        (
          (+$(".total_pecuniarios5").val() * 100) /
          +$("#suma_total_pecuarios").val()
        ).toFixed(2)
      );
    });
    $("body").on("keyup", ".mnp, .mp", function () {
      var sum = 0;
      $(".pp").each(function () {
        var value = $(this).val();
        if (!isNaN(value) && value.length != 0) {
          sum += +value;
        }
      });
      $("#total_porcentaje_pecuarios").val(sum);
    });

    $(document).ready(function () {
      var sum = 0;
      $(".pp").each(function () {
        var value = $(this).val();
        if (!isNaN(value) && value.length != 0) {
          sum += +value;
        }
      });
      $("#total_porcentaje_pecuarios").val(sum);
      var sum = 0;
      $(".tp").each(function () {
        var value = $(this).val();
        if (!isNaN(value) && value.length != 0) {
          sum += +value;
        }
      });
      $("#suma_total_pecuarios").val(sum);
      var sum = 0;
      $(".mp").each(function () {
        var value = $(this).val();
        if (!isNaN(value) && value.length != 0) {
          sum += +value;
        }
      });
      $("#total_monto_pecuario").val(sum);
      var sum = 0;
      $(".mnp").each(function () {
        var value = $(this).val();
        if (!isNaN(value) && value.length != 0) {
          sum += +value;
        }
      });
      $("#total_monto_no_pecuario").val(sum);
    });
  });

  /*function addResponsable() {
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
    var nro = document.getElementsByClassName("tdentidad").length + 1;

    if (nro > 1) {
      document
        .getElementById("remover_entidad")
        .setAttribute("style", "display: inline;");
    }
    if (nro > 4) {
      document
        .getElementById("agregar_entidad")
        .setAttribute("style", "display: none;");
    }
    if (nro <= 5) {
      $("#tabla-entidades").append(
        '<tr id="contador_entidad' +
          nro +
          '">\
                    <td class="tdentidad">\
                        <input class="entidad" placeholder="Entidades participantes" name="entidades_participantes' +
          nro +
          '" />\
                    </td>\
                    <td>\
                        <input class="presupuestario" placeholder="Concepto presupuestario" name="concepto_presupuestario' +
          nro +
          '" />\
                    </td>\
                    <td>\
                        <input class="monto_no_pecuniario' +
          nro +
          ' mnp" type="number" min="0" placeholder="Monto no pecuniario" name="monto_no_pecuniario' +
          nro +
          '" />\
                    </td>\
                    <td>\
                        <input class="monto_pecuniario' +
          nro +
          ' mp" type="number" min="0" placeholder="Monto pecuniario" name="monto_pecuniario' +
          nro +
          '" />\
                    </td>\
                    <td>\
                        <input class="total_pecuniarios' +
          nro +
          ' tp" type="number" placeholder="Total" name="total_pecuniarios' +
          nro +
          '" readonly/>\
                    </td>\
                    <td>\
                        <input class="porcentaje_pecuniarios' +
          nro +
          ' pp" type="number" placeholder="Porcentaje" name="porcentaje_pecuniarios' +
          nro +
          '" readonly/>\
                    </td>\
                </tr>'
      );
    }
  }

  $("body").on("click", "#remover_entidad", removeEntidad);
  function removeEntidad() {
    var nro = document.getElementsByClassName("tdentidad").length;

    if (nro > 1) {
      document
        .getElementById("agregar_entidad")
        .setAttribute("style", "display: inline;");
      $("#contador_entidad" + nro).remove();
    }
    if (nro == 2) {
      document
        .getElementById("remover_entidad")
        .setAttribute("style", "display: none;");
    }

    var sum = 0;
    $(".mnp").each(function () {
      var value = $(this).val();
      if (!isNaN(value) && value.length != 0) {
        sum += +value;
      }
    });
    $("#total_monto_no_pecuario").val(sum);
    var sum = 0;
    $(".mp").each(function () {
      var value = $(this).val();
      if (!isNaN(value) && value.length != 0) {
        sum += +value;
      }
    });
    $("#total_monto_pecuario").val(sum);
    var sum = 0;
    $(".tp").each(function () {
      var value = $(this).val();
      if (!isNaN(value) && value.length != 0) {
        sum += +value;
      }
    });
    $("#suma_total_pecuarios").val(sum);

    // Primero slot
    $(".porcentaje_pecuniarios").val(
      (
        (+$(".total_pecuniarios").val() * 100) /
        +$("#suma_total_pecuarios").val()
      ).toFixed(2)
    );
    // Segundo slot
    $(".porcentaje_pecuniarios2").val(
      (
        (+$(".total_pecuniarios2").val() * 100) /
        +$("#suma_total_pecuarios").val()
      ).toFixed(2)
    );
    // Tercer slot
    $(".porcentaje_pecuniarios3").val(
      (
        (+$(".total_pecuniarios3").val() * 100) /
        +$("#suma_total_pecuarios").val()
      ).toFixed(2)
    );
    // Cuarto slot
    $(".porcentaje_pecuniarios4").val(
      (
        (+$(".total_pecuniarios4").val() * 100) /
        +$("#suma_total_pecuarios").val()
      ).toFixed(2)
    );
    // Quinto slot
    $(".porcentaje_pecuniarios5").val(
      (
        (+$(".total_pecuniarios5").val() * 100) /
        +$("#suma_total_pecuarios").val()
      ).toFixed(2)
    );

    var sum = 0;
    $(".pp").each(function () {
      var value = $(this).val();
      if (!isNaN(value) && value.length != 0) {
        sum += +value;
      }
    });
    $("#total_porcentaje_pecuarios").val(sum);
  }

  $("body").on("click", "#agregar_equipo", addEquipo);
  function addEquipo() {
    var nro = document.getElementsByClassName("tdequipo").length + 1;

    if (nro > 1) {
      document
        .getElementById("remover_equipo")
        .setAttribute("style", "display: inline;");
    }
    if (nro > 4) {
      document
        .getElementById("agregar_equipo")
        .setAttribute("style", "display: none;");
    }
    if (nro <= 5) {
      $("#tabla-equipo").append(
        '<tr id="contador_equipo' +
          nro +
          '">\
                    <td class="tdequipo">\
                        <input placeholder="Registrar al responsable" name="nombre_responsable' +
          nro +
          '" />\
                    </td>\
                    <td>\
                        <input placeholder="Función" name="funcion' +
          nro +
          '" id="funcion" />\
                    </td>\
                    <td>\
                        <input placeholder="Tipo de contrato"  name="tipo_contrato' +
          nro +
          '" id="tipo_contrato"/>\
                    </td>\
                    <td>\
                        <input type="number" min="0" placeholder="Monto"  name="monto' +
          nro +
          '" id="monto" />\
                    </td>\
                    <td>\
                        <input type="number" min="0" placeholder="Al proyecto" name="horas_dedicadas' +
          nro +
          '" id="horas_dedicadas" />\
                    </td>\
                    <td style="vertical-align:middle; text-align:center">\
                        <label class="radio-inline" style="width:10%;"><input type="radio" value="0" name="participacion_otros_proyectos' +
          nro +
          '" checked>No</label>\
                        <label class="radio-inline" style="width:10%; margin-left:20%;"><input type="radio" value="1" name="participacion_otros_proyectos' +
          nro +
          '">Si</label>\
                    </td>\
                </tr>'
      );
    }
  }

  $("body").on("click", "#remover_equipo", removeEquipo);
  function removeEquipo() {
    var nro = document.getElementsByClassName("tdequipo").length;

    if (nro > 1) {
      document
        .getElementById("agregar_equipo")
        .setAttribute("style", "display: inline;");
      $("#contador_equipo" + nro).remove();
    }
    if (nro == 2) {
      document
        .getElementById("remover_equipo")
        .setAttribute("style", "display: none;");
    }
  }
  $("body").on("click", "#guardar_progreso", function () {
    var np = $("#nombre_proyecto"),
      rp = $("#resumen_proyecto"),
      nr = $("#nombre_completo_responsable_proyecto"),
      rr = $("#rut_responsable_proyecto"),
      em = $("#email_responsable_proyecto"),
      ca = $("#cargo_responsable_proyecto"),
      fa = $("#facultad_responsable_proyecto"),
      se = $("#sede_responsable_proyecto");

    np.removeAttr("required"),
      rp.removeAttr("required"),
      nr.removeAttr("required"),
      rr.removeAttr("required"),
      em.removeAttr("required"),
      ca.removeAttr("required"),
      fa.removeAttr("required"),
      se.removeAttr("required");

    $("#guardar_progreso_submit").click();
  });

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

  // COAUTORES
  document.getElementById("cantidad_coautores").addEventListener("change", function () {
      const contenedor = document.getElementById("contenedor-coautores");
      let cantidadActual = document.querySelectorAll(
        "#contenedor-coautores .coautor"
      ).length;
      const cantidadSeleccionada = parseInt(this.value);

      // Si la cantidad seleccionada es mayor a la actual, añadimos coautores
      if (cantidadSeleccionada > cantidadActual) {
        for (let i = cantidadActual + 1; i <= cantidadSeleccionada; i++) {
          let coautorId = `coautor_${i}`;
          const coautorDiv = document.createElement("div");
          coautorDiv.className = "coautor";
          coautorDiv.id = `coautor_${i}`;
          coautorDiv.innerHTML = `
                <br>
                <p><b>Coautor/a ${i}</b></p>
                <table id="tabla-coautor-${i}">
                    <tr>
                        <th class="TextoCentro" style="width:20%;">Nombre: (*)</th>
                        <td><input type="text" class="nombre-coautor" name="nombre_coautor[]" id="${coautorId}" required></td>
                    </tr>
                    <tr>
                        <th class="TextoCentro">Rut: (*)</th>
                        <td><input type="text" name="rut_coautor[]" id="rut${i}" required></td>
                        <span class="error" id="error-rut${i}"></span>
                    </tr>
                    <tr>
                        <th class="TextoCentro">Correo Electrónico: (*)</th>
                        <td><input type="email" name="correo_coautor[]" required></td>
                    </tr>
                    <tr>
                        <th class="TextoCentro">ORCID: (*)</th>
                        <td><input type="text" name="orcid_coautor[]" required></td>
                    </tr>
                    <tr>
                        <th class="TextoCentro">Repositorio UCEN:</th>
                        <td><input type="text" name="repositorio_ucen_coautor[]"></td>
                    </tr>
                    <tr>
                        <th class="TextoCentro">Perfil Scopus:</th>
                        <td><input type="text" name="perfil_scopus_coautor[]"></td>
                    </tr>
                    <tr>
                        <th class="TextoCentro">Perfil WoS (ResearchID):</th>
                        <td><input type="text" name="perfil_wos_coautor[]"></td>
                    </tr>
                    <tr>
                        <th class="TextoCentro">Modalidad:</th>
                        <td>
                            <select name="id_modalidad_coautor[]" required>
                                <option value="">Seleccione</option>
                                <!-- Agregar las opciones de modalidad aquí -->
                                <option value=1>Jornada Completa</option>
                                <option value=2>Media Jornada</option>
                                <option value=3>Honorarios</option>
                                <option value=4>Estudiante Regular</option>
                                <option value=5>3/4 Jornada</option>
                            </select>
                        </td>
                    </tr>
                </table>
            `;
          contenedor.appendChild(coautorDiv);
        }
      }

      // Si la cantidad seleccionada es menor a la actual, eliminamos coautores
      if (cantidadSeleccionada < cantidadActual) {
        for (let i = cantidadActual; i > cantidadSeleccionada; i--) {
          const coautorEliminar = document.getElementById(`coautor_${i}`);
          if (coautorEliminar) {
            contenedor.removeChild(coautorEliminar);
          }
        }
      }

      // Si la cantidad seleccionada es 0, eliminamos todos
      if (cantidadSeleccionada === 0) {
        contenedor.innerHTML = ""; // Elimina todo el contenido
      }

      // El otro campo
      const tabla = document.getElementById("tabla-distribucion");
      let cantidadActual2 =
        document.querySelectorAll("#tabla-distribucion tr").length - 2; // Descontamos la fila de encabezado
      const cantidadSeleccionada2 = parseInt(this.value);

      // Si la cantidad seleccionada es mayor a la actual, agregamos filas
      if (cantidadSeleccionada2 > cantidadActual2) {
        for (let i = cantidadActual2 + 1; i <= cantidadSeleccionada2; i++) {
          const nuevaFila = document.createElement("tr");
          nuevaFila.id = `distribucion_${i}`;
          nuevaFila.innerHTML = `
                <th class="TextoCentro" id="autor-${i}">Coautor/a ${i}</th>
                <td>
                    <input type="number" min="0" max="100" placeholder="Porcentaje" name="porcentaje[]" required>
                </td>
            `;
          tabla.appendChild(nuevaFila);
        }
      }
      console.log(cantidadSeleccionada2, cantidadActual2);
      // Si la cantidad seleccionada es menor, eliminamos filas
      if (cantidadSeleccionada2 < cantidadActual2) {
        for (let i = cantidadActual2; i > cantidadSeleccionada2; i--) {
            console.log(`distribucion_${i}`);
          const filaEliminar = document.getElementById(`distribucion_${i}`);
          console.log(filaEliminar);
          if (filaEliminar && tabla.contains(filaEliminar)) {
            filaEliminar.remove();
          }
        }
      }

      // Si seleccionan 0, eliminamos todas las filas excepto el encabezado
      if (cantidadSeleccionada === 0) {
        const filas = document.querySelectorAll(
          "#tabla-distribucion tr:not(:first-child)"
        );
        filas.forEach((fila) => fila.remove());
      }

      // Aplicar la validación de RUT a todos los campos que ya existen al cargar la página
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

    // 🔹 Al cargar la página, actualizar los nombres de los coautores existentes en la tabla de distribución
    $(document).ready(function () {
      $(".nombre-coautor").each(function () {
          let index = $(this).attr("id").split("_").pop();
          let nombre = $(this).val().trim();
          $("#autor-" + index).text(nombre ? nombre : `Coautor/a ${index}`);
      });
    });


    // 🔹 Validar RUT de coautores dinámicamente
    $(document).on("input", "input[name^='rut_coautor']", function () {
      const rutSolicitante = limpiarRUT($("#rut_solicitante").val());
      const rutActual = limpiarRUT($(this).val());
      let errorMsg = "";

      if (!validarRUT($(this).val())) {
          errorMsg = "❌ RUT inválido";
      } else if (rutActual === rutSolicitante) {
          errorMsg = "⚠️ No puede repetir el RUT del solicitante";
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

      // Buscar el <span> de error dentro del mismo contenedor del input
      let errorSpan = $(this).closest("td").find(".error-msg");

      // Si no existe, lo creamos
      if (errorSpan.length === 0) {
          $(this).after('<span class="error-msg" style="color: red; font-size: 12px;"></span>');
          errorSpan = $(this).closest("td").find(".error-msg");
      }

      // Mostrar mensaje de error
      errorSpan.text(errorMsg);
      $(this).css("border-color", errorMsg ? "red" : "green");
    });
})
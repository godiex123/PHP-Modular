$(document).ready(function(){

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
  document
    .getElementById("cantidad_coautores")
    .addEventListener("change", function () {
      const contenedor = document.getElementById("contenedor-coautores");
      let cantidadActual = document.querySelectorAll(
        "#contenedor-coautores .coautor"
      ).length;
      const cantidadSeleccionada = parseInt(this.value);

      // Si la cantidad seleccionada es mayor a la actual, añadimos coautores
      if (cantidadSeleccionada > cantidadActual) {
        for (let i = cantidadActual + 1; i <= cantidadSeleccionada; i++) {
          const coautorDiv = document.createElement("div");
          coautorDiv.className = "coautor";
          coautorDiv.id = `coautor_${i}`;
          coautorDiv.innerHTML = `
                <br>
                <p><b>Coautor/a ${i}</b></p>
                <table>
                    <tr>
                        <th class="TextoCentro" style="width:20%;">Nombre: (*)</th>
                        <td><input type="text" name="nombre_coautor[]" required></td>
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
                        <th class="TextoCentro">Modalidad contratación UCEN: (*)</th>
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
                <th class="TextoCentro">
                    Autor/a UCEN ${i}
                </th>
                <td>
                    <input type="number" min="0" max="100" placeholder="Porcentaje" name="porcentaje[]" required>
                </td>
            `;
          tabla.appendChild(nuevaFila);
        }
      }

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
          const errorSpan = document.getElementById(
            `error-${input.id}`
          );

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
})
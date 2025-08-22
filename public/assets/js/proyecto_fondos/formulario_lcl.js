$(document).ready(function(){
    const selectCoautores = document.getElementById("cantidad_coautores");

    function addCoautor(cantidad) {
        // Empezamos limpiando el lugar
        document.getElementById("contenedor-coautores").innerHTML = '';
        document.getElementById("tabla-distribucion").innerHTML = `<tr>
                    <th class="TextoCentro"></th>
                    <th class="TextoCentro">Porcentaje del monto solicitado (%)</th>
                </tr>
                <tr>
                    <th class="TextoCentro">
                        Autor/a UCEN 0
                    </th>
                    <td>
                        <input type="number" min="0" placeholder="Porcentaje" name="porcentaje[]" id="porcentaje" required>
                    </td>
                </tr>`;
        // Validamos la cantidad de coautores seleccionados
        if(cantidad > 0) {
            for(i = 1; i <= cantidad; i++) {
                let tabla = `<br>
                    <p><b>Coautor/a ${i}</b></p>
                    <table id="tabla-coautor">
                        <tr>
                            <th class="TextoCentro" style="width:20%;">Nombre: (*)</th>
                            <td>
                                <input type="text" name="nombre_coautor[]" id="nombre_coautor" required>
                            </td>
                        </tr>
                        <tr>
                            <th class="TextoCentro">Rut: (*)</th>
                            <td>
                                <input type="text" class="rut-input" name="rut_coautor[]" id="rut${i}" placeholder="Con puntos, guión y dígito verificador" required>
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
                            <th class="TextoCentro">Modalidad contratación UCEN: (*)</th>
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

                let distribucion = `<tr>
                    <th class="TextoCentro">
                        Autor/a UCEN ${i}
                    </th>
                    <td>
                        <input type="number" min="0" placeholder="Porcentaje" name="porcentaje[]" id="porcentaje" required>
                    </td>
                </tr>`;
                document.getElementById("tabla-distribucion").innerHTML += distribucion;
            }
        }
    }

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
})
$(document).ready(function () {
  $("body").on("change", "#tipo_reporte", function () {
    var id_opcion = $(this).val();

    if (id_opcion === "m_r_b") {
      // Mostrar el mensaje de confirmación
      var confirmacion = window.confirm(
        "¿Descargar Reporte de Matriculados con Respectivo Bloqueo?"
      );

      if (confirmacion) {
        window.location.href =
          "mantenedores/registro_academico/reportes_alumnos_excel.php?reporte=1";
      }
    } else if (id_opcion === "a_c_i") {
      // Mostrar el mensaje de confirmación
      var confirmacion = window.confirm(
        "¿Descargar Reporte de Asignaturas con o sin Inscripción?"
      );

      if (confirmacion) {
        window.location.href =
          "mantenedores/registro_academico/reportes_alumnos_excel.php?reporte=2";
      }
    } else if (id_opcion === "h_r") {
      var confirmacion = window.confirm(
        "¿Descargar Reporte de Alumnos con Inscripciones?"
      );
      if (confirmacion) {
        window.location.href =
          "mantenedores/registro_academico/reportes_alumnos_excel.php?reporte=4";
      }
    } else if (id_opcion === "r_a_a") {
      var confirmacion = window.confirm(
          "¿Descargar Reporte de actas abiertas?"
      );
      if (confirmacion) {
        window.location.href =
            "mantenedores/registro_academico/reportes_alumnos_excel.php?reporte=9";
      }
    } else if (id_opcion === "r_c_p") {
      var confirmacion = window.confirm(
          "¿Descargar Reporte de calificaciones pendientes?"
      );
      if (confirmacion) {
        window.location.href =
            "mantenedores/registro_academico/reportes_alumnos_excel.php?reporte=10";
      }
    }

    $.post(
      "mantenedores/registro_academico/reporteria_alumnos_action.php",
      {
        action: "reportes_module",
        id_opcion: id_opcion,
      },
      function (data) {
        $(".contenedor-tabla").html(data);
      }
    );
  });

  $("body").on("change", "#periodo_academico", function () {
    var id = $(this).val();
    var url =
      "mantenedores/registro_academico/reportes_alumnos_excel.php?reporte=3&periodo=" +
      id;
    $("#descarga_reporte_3").attr("href", url);
  });

  $("body").on("change", "#periodo_academico_b_a", function () {
    var id = $(this).val();
    var url =
      "mantenedores/registro_academico/reportes_alumnos_excel.php?reporte=6&periodo=" + id;
    $("#descarga_reporte_b_a").attr("href", url);
  });

  $("body").on("change", "#id_periodo_pna", function () {
    var id = $(this).val();
    var url =
        "mantenedores/registro_academico/reportes_alumnos_excel.php?reporte=8&periodo=" + id;
    $("#descarga_reportep_n_a").attr("href", url);
  });

  $("body").on("change", "#select_maestro_notas", function () {
    var anio = $(this).val();
    var url = "mantenedores/registro_academico/reportes_alumnos_excel.php?reporte=7&anio=" + anio;
    $("#descarga_maestro_notas").attr("href", url);
  });

  $("body").on("click", "#boton-mineduc", function (event) {
    event.preventDefault();

    periodo = document.getElementById("periodo_mineduc").value;
    if (periodo == "") {
      var advertencia = document.getElementById("advertencia");
      advertencia.innerText = "ERROR: Período no seleccionado.";
      advertencia.style.display = "block";
      return;
    }

    var texto = document.getElementById("texto-ruts").value.trim();
    if (texto !== "") {
      texto = texto.split(/\s+/).filter((valor) => valor !== "");
      nochar = texto.filter((valor) => !/^[0-9]+$/.test(valor));
      if (nochar.length > 0) {
        var advertencia = document.getElementById("advertencia");
        advertencia.innerText = "ERROR: Datos o carácteres no válidos.";
        advertencia.style.display = "block";
        return;
      }
    }

    document.getElementById("advertencia").style.display = "none";
    var ruts = texto.length > 0 ? texto.join(',') : null;
    $.ajax({
      url: "mantenedores/registro_academico/reportes_alumnos_excel.php?reporte=5",
      type: "POST",
      data: {
        action: "reporte_mineduc",
        periodo: periodo,
        ruts: ruts,
      },
      xhrFields: {
        responseType: "blob",
      },
      success: function (data, status, xhr) {
        var blob = new Blob([data], { type: "application/vnd.ms-excel" });
        var url = window.URL.createObjectURL(blob);

        var disposition = xhr.getResponseHeader('Content-Disposition');
        var filename = "reporte_mineduc.xlsx";

        if (disposition && disposition.indexOf('filename=') !== -1) {
          var matches = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (matches != null && matches[1]) { 
            filename = matches[1].replace(/['"]/g, '');
          }
        }

        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      error: function (xhr, status, error) {
        console.error("Error al descargar el archivo:", error);
      },
    });
  });

  /* function initAnioChangeHandler() {
        $('#anio').change(function() {
            var selectedAnio = $(this).val();
            console.log(selectedAnio);

            // Hacemos una nueva solicitud AJAX para la consulta por año
            $.post('mantenedores/registro_academico/reporteria_alumnos_action.php', 
                { 
                    action: 'consulta_por_anio',
                    anio: selectedAnio
                },
                function(data){
                    // Aquí puedes manejar los resultados de la consulta por año
                    $('.contenedor-tabla').html(data);
                }
            );
        });
    } */

  // initAnioChangeHandler();
});

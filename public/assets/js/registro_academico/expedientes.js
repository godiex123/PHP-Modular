$(document).ready(function () {
  $("body").on("click", "#ver_expediente", function () {
    var matricula = $(this).data("matricula");
    var params = new URLSearchParams(window.location.search);

    params.set("matricula", matricula);
    params.toString();
    window.history.replaceState({}, "", `${location.pathname}?${params}`);
    location.reload();
  });

  $("body").on("click", "#volver", function () {
    var params = new URLSearchParams(window.location.search);

    params.set("matricula", "all");
    params.toString();
    window.history.replaceState({}, "", `${location.pathname}?${params}`);
    location.reload();
  });

  $("#modal_datos_alumno").on("show.bs.modal", function (e) {
    var text = $(e.relatedTarget).data("text");
    $("#form_alumno").html(text);
  });

  $("#modal_estado_matricula").on("show.bs.modal", function (e) {
    var matricula = $(e.relatedTarget).data("matricula");
    var estado = $(e.relatedTarget).data("estado");
    var codigo = $(e.relatedTarget).data("codigo");

    $(".codigo2").html(codigo);

    $.post(
      "mantenedores/registro_academico/expedientes_action.php",
      {
        action: "estado_matricula",
        id_matricula: matricula,
        id_estado: estado,
      },
      function (data) {
        $("#form_estado_matricula").html(data);
      }
    );
  });

  $(document).on("change", "#estado_matricula", function () {
    const valorSeleccionado = $(this).val(); // Capturar el valor seleccionado

    // Verifica los valores específicos
    if ([7, 17, 18, 19, 26].includes(parseInt(valorSeleccionado))) {
      $.post(
        "mantenedores/registro_academico/expedientes_action.php",
        {
          action: "select_periodo",
        },
        function (data) {
          // Solo actualiza la sección de periodos
          $("#selector_periodos").html(data);
        }
      );
    } else {
      // Si no cumple con las condiciones, limpia el contenedor
      $("#selector_periodos").html("");
    }
  });

  $("#modal_desbloqueo_academico").on("show.bs.modal", function (e) {
    var matricula_desblo = $(e.relatedTarget).data("matricula_desblo");
    var estado_desblo = $(e.relatedTarget).data("estado_desblo");
    var id_log = $(e.relatedTarget).data("id_log");
    var ultimo_estado_alumno = $(e.relatedTarget).data("ultimo_estado_alumno");

    $.post(
      "mantenedores/registro_academico/expedientes_action.php",
      {
        action: "desbloqueo_academico",
        id_matricula: matricula_desblo,
        id_estado: estado_desblo,
        id_log: id_log,
        ultimo_estado_alumno: ultimo_estado_alumno,
      },
      function (data) {
        $("#form_desbloqueo_academico").html(data);
      }
    );
  });

  $("#modal_eliminar_bloqueo").on("show.bs.modal", function (e) {
    var matricula_eli = $(e.relatedTarget).data("matricula_eli");
    var estado_eli = $(e.relatedTarget).data("estado_eli");
    var id_log_eli = $(e.relatedTarget).data("id_log_eli");
    var ultimo_estado_alumno_eli = $(e.relatedTarget).data(
      "ultimo_estado_alumno_eli"
    );

    $.post(
      "mantenedores/registro_academico/expedientes_action.php",
      {
        action: "eliminar_bloqueo",
        id_matricula: matricula_eli,
        id_estado: estado_eli,
        id_log: id_log_eli,
        ultimo_estado_alumno: ultimo_estado_alumno_eli,
      },
      function (data) {
        $("#form_eliminar_bloqueo").html(data);
      }
    );
  });

  $("#modal_eliminar_actas").on("show.bs.modal", function (e) {
    var matricula = $(e.relatedTarget).data("matricula");
    var codigo = $(e.relatedTarget).data("codigo");

    $(".codigo2").html(codigo);

    $.post(
      "mantenedores/registro_academico/expedientes_action.php",
      {
        action: "inscripciones_matricula",
        id_matricula: matricula,
      },
      function (data) {
        $("#registros").html(data);
      }
    );
  });

  $("#expediente").on("show.bs.modal", function (e) {
    var oferta = $(e.relatedTarget).data().oferta;
    var alumno = $(e.relatedTarget).data().alumno;
    var plan = $(e.relatedTarget).data().plan;
    var carrera = $(e.relatedTarget).data().carrera;
    var rut = $(e.relatedTarget).data().rut;
    var expediente_notas_alumno = "";
    $.post(
      "mantenedores/registro_academico/controladorNotas.php",
      { action: "expediente_notas_alumno", oferta: oferta, alumno: alumno },
      function (data) {
        $("#descargaFicha").attr(
          "href",
          "mantenedores/registro_academico/descarga_ficha_curricular.php?rut=" +
            rut +
            "&oferta=" +
            oferta +
            "&alumno=" +
            alumno +
            "&descarga=true"
        );
        $("#planmodal").html(plan);
        $("#carreramodal").html(carrera);
        $(".modal-body").html(data);
      }
    );
  });

  $("body").on("click", "#botonVolverInicio", function () {
    window.location.href = "inicio.php";
  });

  /* Crear Inputs dinamicamente */
  $("body").on("click", "#btn_agregar", addInput);
  function addInput() {
    var val = document.getElementsByClassName("val");
    var nVal = val.length + 1;

    /*Bloquear boton ADD al septimo input */
    if (nVal <= 7) {
      document
        .getElementById("btn_eliminar")
        .setAttribute("style", "display: inline;");
      $("#padre").append(
        '<tr>\
                                <td id="td' +
          nVal +
          '"><input type="text" step=".01" name="profesor[]" class="form-control Input val" autocomplete="off"></td>\
                                <td id="td' +
          nVal +
          '"><input type="number" step=".01" name="nota_comites[]" class="form-control Input val" autocomplete="off"></td>\
                              </tr>'
      );
    } else {
      document
        .getElementById("btn_agregar")
        .setAttribute("style", "display: none;");
    }
  }

  /* Eliminar Inputs */
  $("body").on("click", "#btn_eliminar", delInput);
  function delInput() {
    var delVal = document.getElementsByClassName("val");
    var nVal = delVal.length;

    /* Bloquear DEL al quedar un input */
    if (nVal > 1) {
      document
        .getElementById("btn_agregar")
        .setAttribute("style", "display: inline;");
      $("#td" + nVal).remove();
      $("#td" + nVal).remove();
    } else {
      document
        .getElementById("btn_eliminar")
        .setAttribute("style", "display: none;");
    }
  }
  /* Suma de valores en un array */
  function suma(a, b) {
    return a + b;
  }

  $("#DataTableFicha").DataTable({
    scrollY: "50vh",
    scrollCollapse: true,
    paging: false,
    info: false,
    sorting: false,
    searching: true,
    language: {
      search: "_INPUT_",
      searchPlaceholder: "Filtrar",
      zeroRecords: "No se encontraron coincidencias",
    },
  });
  $(".dataTables_length").addClass("bs-select");
  $(".dataTables_filter :input").addClass("form-control");

  //MODAL NUEVA MATRICULA
  $("#lista_cohortes").change(function () {
    $("#lista_cohortes option:selected").each(function () {
      var cohorte = $(this).val();
      $.post(
        "mantenedores/registro_academico/expedientes_action.php",
        {
          action: "get_ofertas",
          cohorte: cohorte,
        },
        function (data) {
          $("#lista_ofertas").html(data);
        }
      );
    });
  });
});

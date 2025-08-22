$(document).ready(function () {
  $("#cohortes").change(function () {
    $("#cohortes option:selected").each(function () {
      var cohorte = $(this).val();

      $.post(
        "mantenedores/registro_academico/ajustes_actas_action.php",
        {
          action: "ofertas_por_cohorte",
          cohorte: cohorte,
        },
        function (data) {
          $("#ofertas").html(data);
        }
      );
    });
  });

  //MODAL PARA ABRIR EL ACTA
  $("#abrir_acta").on("show.bs.modal", function (e) {
    var curso_id = $(e.relatedTarget).data().id_curso;
    user = $(e.relatedTarget).data().user;

    $("#curso_id").val(curso_id);
    $("#user").val(user);
  });

  //post abrir acta
  $("#btnAbrirActa").on("click", function (e) {
    var id_curso = $("#curso_id").val();
    var user = $("#user").val();

    $.post(
      "mantenedores/registro_academico/ajustes_actas_action.php",
      { action: "abrir_acta", id_curso: id_curso, user: user },
      function (data) {
        $("input[name='buscar']").click();
      }
    );
  });

  //MODAL PARA ELIMINAR PLANTILLA
  $("#eliminar_plantilla").on("show.bs.modal", function (e) {
    var id_curso = $(e.relatedTarget).data().curso;
    usere = $(e.relatedTarget).data().usere;

    $("#id_curso").val(id_curso);
    $("#usere").val(usere);
  });

  // post eliminar plantilla
  $("#btnEliminarPlantilla").on("click", function (e) {
    var id_curso = $("#id_curso").val();
    var user = $("#usere").val();

    $.post(
      "mantenedores/registro_academico/ajustes_actas_action.php",
      { action: "eliminar_plantilla", id_curso: id_curso, user: user },
      function (data) {
        $("input[name='buscar']").click();
      }
    );
  });

  $("#modal_datos_alumno").on("show.bs.modal", function (e) {
    $(this).find(".btn-ok").attr("href", $(e.relatedTarget).data("href"));
    var alumnoID = $(e.relatedTarget).data().id;
    var datos_alumno = "";
    $.post(
      "mantenedores/registro_academico/matriculados_action.php",
      { action: "datos_alumno", alumnoID: alumnoID },
      function (data) {
        $("#form_alumno").html(data);
      }
    );
  });
  $("#modal_estado_alumno").on("show.bs.modal", function (e) {
    var alumnoID = $(e.relatedTarget).data().id,
      usuario = $(e.relatedTarget).data().usuario;
    var estado_alumno = "";
    $.post(
      "mantenedores/registro_academico/matriculados_action.php",
      { action: "estado_alumno", alumnoID: alumnoID },
      function (data) {
        $("#form_estado_alumno").html(data);
        $("#usuario").val(usuario);
      }
    );
  });
  $("#modal_eliminar_actas").on("show.bs.modal", function (e) {
    $(this).find(".btn-ok").attr("href", $(e.relatedTarget).data("href"));
    var alumnoID = $(e.relatedTarget).data().id;
    var ofertaID = $(e.relatedTarget).data().oferta;
    var alumno_acta = "";
    $.post(
      "mantenedores/registro_academico/matriculados_action.php",
      { action: "alumno_acta", alumnoID: alumnoID, ofertaID: ofertaID },
      function (data) {
        $("#registros").html(data);
      }
    );
  });

  $("#dtDynamicVerticalScrollExample").DataTable({
    scrollY: "50vh",
    scrollCollapse: true,
    paging: false,
    info: false,
    language: {
      search: "_INPUT_",
      searchPlaceholder: "Filtrar",
      zeroRecords: "No se encontraron coincidencias",
    },
  });
  $(".dataTables_length").addClass("bs-select");
  $(".dataTables_filter :input").addClass("form-control");
});

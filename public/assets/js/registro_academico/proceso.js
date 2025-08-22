$(document).ready(function () {
  $("#datatabletitulacion").DataTable({
    scrollY: "50vh",
    scrollCollapse: true,
    paging: true,
    info: false,
    ordering: true,
    searching: true,
    pageLength: 50,
    lengthMenu: [50, 100],
    language: {
      search: "_INPUT_",
      searchPlaceholder: "Filtrar",
      zeroRecords: "No se encontraron coincidencias",
    },
  });
  $(".dataTables_length").addClass("bs-select");
  $(".dataTables_filter :input").addClass("form-control");
});

/* CERRAR PROCESO*/
$("body").on("show.bs.modal", "#revisar", function (e) {
  var id = $(e.relatedTarget).data("id"),
    //logro_ct = $(e.relatedTarget).data('logro_ct'),
    //matricula = $(e.relatedTarget).data('matricula'),
    nombres = $(e.relatedTarget).data("nombres");

  $("#id_modal").val(id);
  //$('#logro_ct').val(logro_ct);
  $("#nombres").html(nombres);
});

/* GENERAR FOLIO */

$("body").on("show.bs.modal", "#folio", function (e) {
  var id = $(e.relatedTarget).data("id"),
    nombres = $(e.relatedTarget).data("nombres"),
    id_folio = $(e.relatedTarget).data("id_folio");
  num_folio = $(e.relatedTarget).data("num_folio");

  $("#id_candidato").val(id);
  $("#nombres").html(nombres);
  $("#id_folio").val(id_folio);
  $("#num_folio").val(num_folio);
});

/* SOLICITAR RESOLUCION */
$("body").on("show.bs.modal", "#resolucion", function (e) {
  var id = $(e.relatedTarget).data("id"),
    matricula = $(e.relatedTarget).data("matricula"),
    nombres = $(e.relatedTarget).data("nombres"),
    resoluciones = $(e.relatedTarget).data("resoluciones");

  $("#id_candidato_resolucion").val(id);
  $("#id_matricula_resolucion").val(matricula);
  $("#nombres_resolucion").html(nombres);
  $("#resoluciones").val(resoluciones);
});

/* SOLICITAR FOLIOS */
$("body").on("show.bs.modal", "#folio", function (e) {
  var id_candidato_folio = $(e.relatedTarget).data("id_candidato_folio"),
    matricula_folio = $(e.relatedTarget).data("matricula_folio"),
    nombres_candidato_folio = $(e.relatedTarget).data(
      "nombres_candidato_folio"
    ),
    num_folio = $(e.relatedTarget).data("num_folio");

  $("#id_candidato_folio").val(id_candidato_folio);
  $("#id_matricula_folion").val(matricula_folio);
  $("#nombres_folio").html(nombres_candidato_folio);
  $("#folios").val(num_folio);
});

/* MODAL NOTAS */

$("body").on("show.bs.modal", "#nota", function (e) {
  var id_matricula = $(e.relatedTarget).data("matricula");

  $.post(
    "mantenedores/registro_academico/proceso_action.php",
    {
      action: "notas_pendientes",
      id_matricula: id_matricula,
    },
    function (response) {
      $("#notas_pendientes").html(response);
    }
  );
});

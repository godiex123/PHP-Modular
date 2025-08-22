$(document).ready(function () {
    
    $('#datatabletitulacion').DataTable({
        "scrollY": "50vh",
        "scrollCollapse": true,
        "paging": true,
        "info": false,
        "ordering": true,
        "searching":true,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');
});

    /* GENERAR RESOLUCION */
    $('body').on('show.bs.modal', '#generar', function(e){
        var id = $(e.relatedTarget).data('id_candidato');
        $('#id_candidato_resolucion').val(id);

});
$(document).ready(function(){
    $('#tablaPostulacion').DataTable({
        "scrollY": "49vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "bDestroy": true,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar Postulaciones",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');
    
    $('#adjudicar').on('show.bs.modal', function(e) {
        var id_postulacion = $(e.relatedTarget).data('id');

        $('#id_postu').val(id_postulacion);

    });
})
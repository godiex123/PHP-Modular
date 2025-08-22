$(document).ready(function () {

    $('#datatabletitulacion').DataTable({
        "scrollY": "40vh",
        "scrollCollapse": true,
        "paging": true,
        "iDisplayLength": 25,
        "info": false,
        "bDestroy": true,
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar",
            "zeroRecords": "No se encontraron coincidencias",
            "paginate": {
                "previous": "Anterior",
                "next": "Siguiente"
            }
        },
        aaSorting: [],
        dom: 'Bfrtip',
        buttons: [
            { extend: 'excel', text:'Descargar Reporte Excel', className: 'btn btn-success btn-sm' },
        ]
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');

});

    /* GENERAR FOLIO */
    $('body').on('show.bs.modal', '#generarfolio', function(e){
        var id = $(e.relatedTarget).data('id_candidatos');
        $('#id_candidato_folio').val(id);
    

});

    /* GENERAR RESOLUCION */
    $('body').on('show.bs.modal', '#generar', function(e){
        var id = $(e.relatedTarget).data('id_candidato');
        $('#id_candidato_resolucion').val(id);

});
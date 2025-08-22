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
            { extend: 'excel', text:'Excel', className: 'btn btn-success btn-sm' },
        ]
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');
    
    $('body').on('show.bs.modal', '#revisar', function(e){
       var id   = $(e.relatedTarget).data('id'),
       rut      = $(e.relatedTarget).data('rut'),
       nombres  = $(e.relatedTarget).data('nombres'),
       programa = $(e.relatedTarget).data('programa');
       
       $('#id_modal').val(id);
       $('#rut_modal').html(rut);
       $('#nombres_modal').html(nombres);
       $('#programa_modal').html(programa);
       

    });
    
})
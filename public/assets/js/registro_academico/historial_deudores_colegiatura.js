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
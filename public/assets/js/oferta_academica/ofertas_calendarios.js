$(document).ready(function(){  
    
    $('#crear-cursos').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });


    $('#publicar-calendario').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    $('#despublicar-calendario').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    // Datatable
    $('#DTCalendarios').DataTable({
        /*"scrollY": "55vh",*/
        "scrollCollapse": true,
        "paging": false,
        "bDestroy": true,
        "info": false,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Buscar...",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');
})
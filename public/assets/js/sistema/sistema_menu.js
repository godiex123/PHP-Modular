$(document).ready(function(){
    $('#modificar').on('show.bs.modal', function(e) {
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('#nueva').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
    });

    $('#eliminar').on('show.bs.modal', function(e) {
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    $('#DatatableMenu').DataTable({
        "scrollY": "60vh",
        "scrollCollapse": true,
        "paging": false,
        "bDestroy": true,
        "info": false,
        'iDisplayLength': -1,
        'bSort': false,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Buscar...",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');
})
$(document).ready(function(){

    $('#modificar').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('#nueva').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
    });

    $('#eliminar').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });
})
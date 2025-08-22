$(document).ready(function(){
    $('#modificar-mensaje').on('show.bs.modal', function(e) {
        //$(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.rolmensaje').html($(e.relatedTarget).data('proceso'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });
})
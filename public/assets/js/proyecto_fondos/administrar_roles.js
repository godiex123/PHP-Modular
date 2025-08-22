$(document).ready(function(){
    $('#modificar-rol').on('show.bs.modal', function(e) {
        //$(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });
})
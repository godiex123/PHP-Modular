$(document).ready(function(){
    function aceptar_solicitud(id)
    {
        $.post('mantenedores/registroAcademico/controladorNotas.php', {action: 'aceptar_solicitud', solicitudID:id}, function(data){
            $('.salida').html(data);
            window.location = window.location.href;
        });
    }
    $('#rechazarSolicitud').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        var a = $(e.relatedTarget).data().id;
        $(e.currentTarget).find('#solicitudID').val(a);
    });
})
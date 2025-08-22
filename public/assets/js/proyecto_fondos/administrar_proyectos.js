$(document).ready(function(){
    $('#modificar-proyecto').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('#nueva-asignatura').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
    });

    $('#pre-requisito-asignatura').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        var id_asig_prerequisito = $(e.relatedTarget).data().id;
        var id_decreto_prerequisito = $(e.relatedTarget).data().decreto;

        $.post("mantenedores/asignaturasAction.php",{id_asig_titulo : id_asig_prerequisito}, function(e){
            $("#titulo").html(e);
        });

        $.post("mantenedores/asignaturasAction.php",{id_asig_prerequisito1 : id_asig_prerequisito}, function(e){
            $("#Cuadro1").html(e);
        });

        $.post("mantenedores/asignaturasAction.php",{id_asig_prerequisito2 : id_asig_prerequisito, id_decreto_prerequisito : id_decreto_prerequisito}, function(e){
            $("#Cuadro2").html(e);
        });
    });    


    $(document).on("click","#eliminar-prerequisito",function(){
        var id_eliminar_prerequisito = $(this).data("id_eliminar_prerequisito");
        
        $.post("mantenedores/asignaturasAction.php",{id_eliminar_prerequisito : id_eliminar_prerequisito}, function(e){
            location.reload();
        });
    });

    $('#eliminar-proyecto').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });
})
$(document).ready(function(){
    $('#aprobar-postulacion').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('#nueva-asignatura').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
    });


    $(document).on("click","#eliminar-prerequisito",function(){
        var id_eliminar_prerequisito = $(this).data("id_eliminar_prerequisito");
        
        $.post("mantenedores/asignaturasAction.php",{id_eliminar_prerequisito : id_eliminar_prerequisito}, function(e){
            location.reload();
        });
    });

    $('#rechazar-postulacion').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    $('#finalizar-postulacion').on('show.bs.modal', function(e) {
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    $('#correcion-postulacion').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    $('#listadoExternas').DataTable({
        "scrollY": "49vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "bDestroy": true,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar Postulaciones",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');

    $('#listadoInternas').DataTable({
        "scrollY": "49vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "bDestroy": true,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar Postulaciones",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');
    
    $('body').on('click', '.procesos', function(e){
        $('#finalizar-postulacion .ContenedorPopupNeutro').waitMe({
            "effect" : 'roundBounce',
            "text" : 'Espere por favor...',
            "bg" : "rgba(255,255,255,0.9)",
            "color" : "#707b7c"
        });
    })
})
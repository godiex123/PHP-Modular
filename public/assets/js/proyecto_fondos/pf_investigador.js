$(document).ready(function(){

    $('#enviar-postulacion').on('show.bs.modal', function(e) {
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });
    
    
    $('#cargar-archivos').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
        var tipo = $(e.relatedTarget).data('tipo'),
            user = $(e.relatedTarget).data('user');
            post = $(e.relatedTarget).data('post');
        $.post('mantenedores/proyecto_fondos/pf_action.php', {misdocumentos:tipo, user:user, post:post}, function(data){
            $(".mis-documentos").html(data);
        })
    
    
    });
    
    $("body").on("click", "#borrar_mi_archivo", function(){
        var id          = $(this).data("id"),
            filename    = $(this).data("filename"),
            postulacion = $(this).data("postulacion"),
            user        = $(this).data("user"),
            tipo        = $(this).data("tipo");
    
        $.post('mantenedores/proyecto_fondos/pf_action.php', {action:"borrar_mi_archivo", id:id, filename:filename, user:user, tipo:tipo, id_postulacion:postulacion}, function(data){
            $(".mis-documentos").html(data);
        })
    })
    
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
})
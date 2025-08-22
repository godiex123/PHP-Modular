$(document).ready(function() {
    $('#modificar-decreto').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('#nuevo-decreto').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
    });

    $('#eliminar-decreto').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        $('#id_decreto_del').val(id);
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    $('body').on('click', '#eliminar_resolucion', function() {
        var id = $(this).data('id'),
            file = $(this).data('file');
        $.post("mantenedores/planes_de_estudio/decretos_action.php",{action:'eliminar_resolucion', id:id, file:file}, function(res){
            if(res == "si") {
                toastr.success("Resolución eliminada", "¡Bien!");
            } else {
                toastr.error("Error al eliminar resolución", "¡Error!");
            }
            setTimeout(function() {
                location.reload();
            }, 700);
        })
    });

    $('body').on('click', '#eliminar_catalogo', function() {
        var id = $(this).data('id'),
            file = $(this).data('file');
        $.post("mantenedores/planes_de_estudio/decretos_action.php",{action:'eliminar_catalogo', id:id, file:file}, function(res){
            if(res == "si") {
                toastr.success("Catalogo eliminado", "¡Bien!");
            } else {
                toastr.error("Error al eliminar catalogo", "¡Error!");
            }
            setTimeout(function() {
                location.reload();
            }, 700);
        })
    });

    $('#DatatablePde').DataTable({
        "scrollY": "55vh",
        "scrollCollapse": true,
        "paging": false,
        "bDestroy": true,
        "info": false,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');
})
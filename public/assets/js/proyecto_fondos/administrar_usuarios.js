$(document).ready(function(){
    $('#modificar-datos-usuario').on('show.bs.modal', function(e) {
        //$(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('#modificar-rol-usuario').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('#nueva-asignatura').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
    });  


    $('body').on('click', '.eliminarRol', function(){
        var user_rol_id   = $(this).val();

        $.post('mantenedores/proyecto_fondos/pf_action.php', {action:'eliminar_rol', user_rol_id:user_rol_id}, function(){
            location.reload();
        })
    })

    $('body').on('click', '.eliminarAsignacion', function(){
        var asignacion   = $(this).val();

        $.post('mantenedores/proyecto_fondos/pf_action.php', {action:'eliminar_asignacion_externa', asignacion:asignacion}, function(){
            location.reload();
        })
    })

    $('body').on('click', '.eliminarAsignacionInterna', function(){
        var asignacion   = $(this).val();

        $.post('mantenedores/proyecto_fondos/pf_action.php', {action:'eliminar_asignacion_interna', asignacion:asignacion}, function(){
            location.reload();
        })
    })

    $('body').on('click', '.eliminarDecanoFacultad', function(){
        var id   = $(this).val();

       $.post('mantenedores/proyecto_fondos/pf_action.php', {action:'eliminar_decano_facultad', id:id}, function(){
            location.reload();
        })
    })

    $('#listadoUsuarios').DataTable({
        "scrollY": "49vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "bDestroy": true,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');

    $('#listadoAsignacionesExternas').DataTable({
        "scrollY": "49vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "bDestroy": true,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');

    $('#listadoAsignacionesInternas').DataTable({
        "scrollY": "49vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "bDestroy": true,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');

    $('#listadoDecanos').DataTable({
        "scrollY": "49vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "bDestroy": true,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');
})
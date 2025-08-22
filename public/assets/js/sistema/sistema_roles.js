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

    $(document).ready(function(){
        $('#rol_permiso').change(function(){
            $('#rol_permiso option:selected').each(function(){
                var id_rol=$(this).val();
                $.post('mantenedores/sistema/sistema_roles_action.php', {action:'tabla_permisos', id_rol:id_rol}, function(data){
                    $('.resultado').html(data);
                });
            });
        })
    });

    $('body').on('click', '#permitir_todos', function(e) {
        var menu = $(this).data('id'),
            rol  = $('#rol_permiso').val();

        $.post('mantenedores/sistema/sistema_roles_action.php', {action:'permitir_todos', id_menu:menu, id_rol:rol}, function(data){
            if(data == 0) {
                toastr.error("No hay permisos que ingresar", "¡Error!");
            } else {
                $('.resultado').html(data);
                toastr.success("Permisos ingresados", "¡Bien!");
            }
        });
    })

    $('body').on('click', '#denegar_todos', function(e) {
        var menu = $(this).data('id'),
            rol  = $('#rol_permiso').val();

        $.post('mantenedores/sistema/sistema_roles_action.php', {action:'denegar_todos', id_menu:menu, id_rol:rol}, function(data){
            if(data == 0) {
                toastr.error("No hay permisos que denegar", "¡Error!");
            } else {
                $('.resultado').html(data);
                toastr.success("Permisos denegados", "¡Bien!");
            }
        });
    })

    $('body').on('click', '#permitir', function(e) {
        var menu = $(this).data('id'),
            rol  = $('#rol_permiso').val();

        $.post('mantenedores/sistema/sistema_roles_action.php', {action:'permitir_uno', id_menu:menu, id_rol:rol}, function(data){
            if(data == 0) {
                toastr.error("No hay permiso que ingresar", "¡Error!");
            } else {
                $('.resultado').html(data);
                toastr.success("Permiso ingresado", "¡Bien!");
            }
        });
    })

    $('body').on('click', '#denegar', function(e) {
        var menu = $(this).data('id'),
            rol  = $('#rol_permiso').val();

        $.post('mantenedores/sistema/sistema_roles_action.php', {action:'denegar_uno', id_menu:menu, id_rol:rol}, function(data){
            if(data == 0) {
                toastr.error("No hay permiso que denegar", "¡Error!");
            } else {
                $('.resultado').html(data);
                toastr.success("Permiso denegado", "¡Bien!");
            }
        });
    })

    $('body').on('click', '#Grabar', function(e) {
        console.log("ESTO SI PASA");
        //var menu = $(this).data('id'),
        //    rol  = $('#rol_permiso').val();

        //$.post('mantenedores/sistema/sistema_roles_action.php', {action:'denegar_uno', id_menu:menu, id_rol:rol}, function(data){
        //    if(data == 0) {
        //        toastr.error("No hay permiso que denegar", "¡Error!");
        //    } else {
        //        $('.resultado').html(data);
        //        toastr.success("Permiso denegado", "¡Bien!");
        //    }
        //});
    })

    $('#DatatableRoles').DataTable({
        "scrollY": "40vh",
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
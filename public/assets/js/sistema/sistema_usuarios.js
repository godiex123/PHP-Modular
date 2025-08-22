$(document).ready(function(){

    $('#DT_usuarios').DataTable({
        "scrollY": "60vh",
        "scrollCollapse": true,
        "paging": false,
        "bDestroy": true,
        "info": false,
        'iDisplayLength': -1,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Buscar...",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');

    $("body").on("click", "#showPass", function() {
        var user = $(this).data("u");
        var pass = $(this).data("pass");
        $("#" + user).html(pass);
        $(this).removeClass("glyphicon-eye-open");
        $(this).addClass("glyphicon-eye-close");
        $(this).prop("title", "Ocultar");
        $(this).attr("id", "hidePass");
    })

    $("body").on("click", "#hidePass", function() {
        var user = $(this).data("u");
        var crip = $(this).data("crip");
        var large = crip.length;
        var pass = crip.substring(large, large - 10);
        $("#" + user).html(pass + "...");
        $(this).removeClass("glyphicon-eye-close");
        $(this).addClass("glyphicon-eye-open");
        $(this).prop("title", "Mostrar");
        $(this).attr("id", "showPass");
    })

    $("#modificar-usuario" ).on('show.bs.modal', function(e){
        $('.modUsuario').html( $(e.relatedTarget).data('fulltext') );
    });

    $("body").on("click", "#modificarClave", function(){
        var id = $(this).data("id");
        $("#usuario_id_clave").val(id);
    })

    $("body").on("click", "#eliminarUsuario", function(){
        var id = $(this).data("id");
        $("#usuario_id_eliminar").val(id);
    })

})
$(document).ready(function(){
    $('#nueva-clase').on('show.bs.modal', function(e) {
        $('.select2').select2({
            placeholder: "Busque por RUT o apellido",
            allowClear: true,
            width: '100%', // importante para que no se vea roto
            dropdownParent: $('#nueva-clase')
        });
    });

    $('#modificar-clase').on('show.bs.modal', function(e) {
        var calendario = $(e.relatedTarget).data('calendario'),
            asignatura = $(e.relatedTarget).data('asignatura');
        $('#m_calendario').val(calendario);
        $('#m_asignatura').val(asignatura);

        $('.select2').select2({
            placeholder: "Busque por RUT o apellido",
            allowClear: true,
            width: '100%', // importante para que no se vea roto
            dropdownParent: $('#modificar-clase')
        });
    });


    $('#confirm-delete').on('show.bs.modal', function(e) {
        var calendario = $(e.relatedTarget).data('calendario'),
            fecha = $(e.relatedTarget).data('fecha');
        
        $('#d_calendario').val(calendario);
        $('#d_fecha').val(fecha);
                           
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('#compartir-asignatura').on('show.bs.modal', function(e) {
        var calendario = $(e.relatedTarget).data('calendario');
        var asignatura = $(e.relatedTarget).data('asignatura');
        var seccion    = $(e.relatedTarget).data('seccion');
        
        $('#c_calendario').val(calendario);
        $('#c_asignatura').val(asignatura);
        $('#c_seccion').val(seccion);

        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('#eliminar-asignatura').on('show.bs.modal', function(e) {
        var calendario  = $(e.relatedTarget).data('calendario');
        var asignatura  = $(e.relatedTarget).data('asignatura');
        var seccion     = $(e.relatedTarget).data('seccion');
        var articuladas = $(e.relatedTarget).data('articuladas');
        var texto = "";
        
        $('#e_calendario').val(calendario);
        $('#e_asignatura').val(asignatura);
        $('#e_seccion').val(seccion);
        if (articuladas == true){
            texto = '<p style="color:red;font-size:12px">ADVERTENCIA: Asignaturas articuladas dependientes. Éstas se borrarán junto con la asignatura seleccionada.</p>';
        } else {
            texto = '';
        }
                           
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + '<br>' + texto);
    });

    $('body').on('click', '#borrar_articulacion', function(){
        var calendario = $(this).data('calendario');
        var usuario    = $(this).data('usuario');

        $.post(
            'mantenedores/oferta_academica/programacion_action.php', 
            { action: 'borrar_articulacion', id:calendario, usuario:usuario }, 
            function(data) {
             if(data == 1) {
                 toastr.success('Registro modificado', '¡Bien!');
                 setTimeout(function() {
                    location.reload();
                }, 500);
             } else {
                 toastr.error('Al modificar registro', '¡Error!');
                 setTimeout(function() {
                    location.reload();
                }, 500);
             }
            }
        );
    })

    $('#modificar-fecha').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('#datos-asignatura').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));               
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('#datos-horas').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    /*$('#duplicar-seccion').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));                
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });*/

    $('#modifica-profesor').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));                
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('.form_nueva_clase').on('submit', function(event){
        var total   = $('#n_total_semanas'),
            semanas = $('#n_semanas');
        if(parseInt(total.val()) < parseInt(semanas.val())) {
            event.preventDefault();
            total.focus();
            $('.n_msj_validacion').html("El total de semanas no puede ser menor a " + semanas.val());
        }
    })
    $('.form_mod_clase').on('submit', function(event){
        var total   = $('#m_total_semanas'),
            semanas = $('#m_semanas');
        if(parseInt(total.val()) < parseInt(semanas.val())) {
            event.preventDefault();
            total.focus();
            $('.m_msj_validacion').html("El total de semanas no puede ser menor a " + semanas.val());
        }
    })
    $('.collapse').on('shown.bs.collapse', function(e){
        var nro = $(e.relatedTarget).data("nro");
        console.log(nro);
        $("#down" + nro).hide();
        $("#up" + nro).show();
    })

    $('.collapse').on('hidden.bs.collapse', function(e){
        var nro = $(e.relatedTarget).data("nro");
        $("#down" + nro).show();
        $("#up" + nro).hide();
       
    })

    $('body').on('click', '#artSi', function(){
        $('.sinArt').hide();
        $('.conArt').show();
        $('#id_asignatura_madre').prop('required', true);

        $('#seccion').prop('required', false);
        $('#periodo_academico').prop('required', false);
        $('#fecha').prop('required', false);
        $('#hora_ini').prop('required', false);
        $('#n_semanas').prop('required', false);
        $('#n_total_semanas').prop('required', false);
    })

    $('body').on('click', '#artNo', function(){
        $('.sinArt').show();
        $('.conArt').hide();
        $('#id_asignatura_madre').prop('required', false);

        $('#seccion').prop('required', true);
        $('#periodo_academico').prop('required', true);
        $('#fecha').prop('required', true);
        $('#hora_ini').prop('required', true);
        $('#n_semanas').prop('required', true);
        $('#n_total_semanas').prop('required', true);
    })

    $('#id_asignatura').change(function(){
        $('#id_asignatura option:selected').each(function(){
            var id=$(this).val(),
                cod = $(this).html().split(" ");

            $.post(
                'mantenedores/oferta_academica/programacion_action.php', 
                { action: 'articulacion', id:id, cod:cod[0] }, 
                function(data) {
                $('#id_asignatura_madre').html(data);
                }
            );
        });
    });

    $('body').on('change', '#profesor_fecha', function(){
        $('#profesor_fecha option:selected').each(function(){
            var fecha      =$(this).val(),
                calendario = parseInt($('#profesor_id_calendario').val());
            //console.log(fecha);

            $.post(
                'mantenedores/oferta_academica/programacion_action.php', 
                { action: 'modificar_profesor', fecha:fecha, calendario:calendario }, 
                function(data) {
                $('#salida_modificar_profesor').html(data);
                }
            );
        });
    });

    $("body").on("click", "#cafe", function(){
        var id          = $(this).data("id"),
            valor       = $(this).data("valor"),
            calendario  = $(this).data("calendario"),
            usuario     = $(this).data("usuario");

        
        $.post(
            'mantenedores/oferta_academica/programacion_action.php',
            {
                action: 'cafe',
                id:id,
                valor: valor,
                id_calendario: calendario,
                usuario: usuario
            },
            function(data) {
                if(data == 1) {
                    toastr.success('Registro modificado', '¡Bien!');
                    setTimeout(function() {
                       location.reload();
                   }, 500);
                } else {
                    toastr.error('Al modificar registro', '¡Error!');
                    setTimeout(function() {
                       location.reload();
                   }, 500);
                }
            }
        );
    })

})
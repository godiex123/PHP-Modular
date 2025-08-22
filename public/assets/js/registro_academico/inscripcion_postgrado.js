$(document).ready(function(){

    /* Cohortes */
    $('#cohortes').change(function(){
        $('#cohortes option:selected').each(function(){
            var id  = $(this).val();
            var sra = $('#usuario_sra').val();
            var res = parseInt($('#responsable').val());
            var gparams = $('#gParams').val();

            $.post(
                'mantenedores/registro_academico/inscripcion_postgrado_action.php', 
                { 
                    action: 'ofertas_con_calendario', 
                    id_cohorte:id,
                    sra:sra,
                    responsable:res,
                    gparams:gparams
                }, 
                function(data) {
                    $('#ofertas').html(data);
                }
            );
        });
    });

    $('.delete-row').click(function() {
        var alumnoID = $(this).data().row_id;
        var cursoID = $(this).data().curso;
        var desinscribir_alumno = "";
        $.post('mantenedores/registro_academico/inscripcion_postgrado_action.php', {action:'desinscribir_alumno', alumnoID:alumnoID, cursoID:cursoID}, function(data) {
            $(".salida").html(data);
        });
    });

    $("body").on("click", "#asignatura", function(){
        var asig        = $(this).data("id"); 
        var params      = new URLSearchParams(window.location.search);
    
        params.set("asignatura", asig);
        params.toString();
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
        location.reload();
    });

    $("body").on("click", "#botonVolver", function(){
        var params      = new URLSearchParams(window.location.search);
    
        params.set("asignatura", "all");
        params.toString();
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
        location.reload();
    });

    $("body").on("click", "#botonVolverInicio", function(){
        window.location.href = "inicio.php";
    });

    $('body').on('click', '#Mchk', function(){
        var checkboxes = document.querySelectorAll('input[id="chk"]');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] != this)
            checkboxes[i].checked = this.checked;
        }
    });

    $('body').on('click', '#Mchk2', function(){
        var checkboxes = document.querySelectorAll('input[id="chk2"]');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] != this)
            checkboxes[i].checked = this.checked;
        }
    });
    
    $('body').on('input', '#busqueda_alumno',function(e){
        var rut = $(this).val();
        if (rut.length >= 6) {

            var oferta = $("#ofertaid").val();

            /*$('#ofertas option:selected').each(function(){
                oferta = $(this).val();
            });*/

            $.post(
                'mantenedores/registro_academico/inscripcion_postgrado_action.php', 
                {
                    action: 'busqueda_alumno', 
                    oferta: oferta,
                    rut   : rut
                }, 
                function(data) {
                    if(data == 0) {
                        $("#cuadro2").html("<div class='alert alert-danger alert-dismissible text-center'>No encontrado</div>");
                    } else {
                        var datos = jQuery.parseJSON(data); 
                        $("#cuadro2").html("\
                        <input type='hidden' name='alumno1' value='"+ datos[0] +"'>\
                        <div class='alert alert-success alert-dismissible text-center'>" + datos[1] + " " + datos[2] + " " + datos[3] + "</div>");
                    }
                }
            );
        }
    });

    
    $('body').on('click','input[id$="chk2"]', function(){
        var todos = document.querySelectorAll('input[id="chk2"]');
        var empty = [].filter.call( todos, function(el){
            return !el.checked
        })
        
        if (todos.length == empty.length)
        {
            $('#btn-out').attr('disabled', true);
            $('#btn-out').removeClass("BtnActivoRojo");
            $('#btn-out').addClass("btn-default");
        }
        else
        {
            $('#btn-out').attr('disabled', false);
            $('#btn-out').addClass("BtnActivoRojo");
            $('#btn-out').removeClass("btn-default");
        }
    })
    
    $('body').on('click', 'input[id$="chk"]', function(){
        var todos = document.querySelectorAll('input[id="chk"]');
        var empty = [].filter.call( todos, function(el){
            return !el.checked
        })
        
        if (todos.length == empty.length)
        {
            $('#btn-in').attr('disabled', true);
            $('#btn-in').removeClass("BtnActivoVerde");
            $('#btn-in').addClass("btn-default");
        }
        else
        {
            $('#btn-in').attr('disabled', false);
            $('#btn-in').addClass("BtnActivoVerde");
            $('#btn-in').removeClass("btn-default");
        }
    })


$(document).ready(function () {
    $('#dtDynamicVerticalScrollDisponibles').DataTable({
        "scrollY": "50vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "ordering": false,
        "bDestroy": true,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Buscar",
            "zeroRecords": "No hay alumnos"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');
});
$(document).ready(function () {
    $('#dtDynamicVerticalScrollInscritos').DataTable({
        "scrollY": "50vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "ordering": false,
        "bDestroy": true,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Buscar",
            "zeroRecords": "No hay alumnos"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');
});

})
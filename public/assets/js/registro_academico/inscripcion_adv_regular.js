$(document).ready(function(){

    $('#cohortes').change(function(){
        $('#cohortes option:selected').each(function(){
            var cohorte=$(this).val();
            var sra = $('#usuario_sra').val();
            var res = $('#responsable').val();
            var gParams = $('#gParams').val();

            $.post(
                'mantenedores/registro_academico/inscripcion_adv_regular_action.php', 
                {
                    action: 'ofertas_con_calendario', 
                    cohorte:cohorte,
                    sra:sra,
                    responsable:res,
                    gParams: gParams
                }, 
                function(data){
                    $('#ofertas').html(data);
                }
            );
        });
    });

    $("body").on("click", "#asignatura", function(){
        var asig        = $(this).data("id"); 
        var oferta      = parseInt($(this).data("artofe"));
        var params      = new URLSearchParams(window.location.search);
    
        params.set("curso", asig);
        if(oferta > 0) params.set("artofe", oferta);
        params.toString();
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
        location.reload();
    });

    $("body").on("click", ".verMat", function(){
        var oferta = $(this).data("id");
        $.post(
            "mantenedores/registro_academico/inscripcion_adv_regular_action.php",
            {
                action: "ver_matriculados",
                oferta:oferta
            },
            function(data){
                $(".resultado").html(data);
            }
        );
    })

    $("body").on("click", ".seleccionar_alumno", function(){
        var rut = $(this).data("rut");
        $("#rutAlumno").val(rut);
        $(".resultado").empty();
        buscarAlumno();
    
    })

    $("body").on("click", ".cerrar", function(){
        $("#rutAlumno").val("");
        $(".resultado").empty();
    })

    $("body").on("click", "#botonVolverInicio", function(){
        window.location.href = "inicio.php";
    });

    $("body").on("click", "#buscarAlumno", buscarAlumno);

    function buscarAlumno() {
        var rut         = $("#rutAlumno").val();
        var cod_asig    = $("#cod_asig").val();
        var curso       = parseInt($("#cursoID").val());
        var oferta      = parseInt($("#ofertaID").val());
        var artofe      = parseInt($("#artofeID").val());

        if(rut.length == 0) {
            $(".resultado").html('<div class="alert alert-danger" role="alert">DEBE INGRESAR UN RUT</div>');
        } else if(isNaN(rut)) {
            $(".resultado").html('<div class="alert alert-danger" role="alert">RUT NO VALIDO</div>');
        } else if(rut.length < 6) {
            $(".resultado").html('<div class="alert alert-danger" role="alert">RUT NO VALIDO</div>');
        } else {
            $.post(
                "mantenedores/registro_academico/inscripcion_adv_regular_action.php",
                {
                    action: "validar_inscripcion",
                    rut:rut,
                    cod_asig:cod_asig,
                    curso:curso,
                    oferta:oferta,
                    artofe:artofe
                },
                function(data){
                    $(".resultado").html(data);
                }
            );
        }
    }

    $("body").on("click", "#botonVolver", function(){
        var params      = new URLSearchParams(window.location.search);
    
        params.set("curso", "all");
        params.set("artofe", "0");
        params.toString();
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
        location.reload();
    });
    
    $('#desinscribir').on('show.bs.modal', function(e) {
        var inscripcion = $(e.relatedTarget).data().inscripcion;
        var matricula = $(e.relatedTarget).data().matricula;
        var curso = $(e.relatedTarget).data().curso;
        $("#IDinscripcion").val(inscripcion);
        $("#IDmatricula").val(matricula);
        $("#IDcurso").val(curso);
        console.log(inscripcion, matricula, curso);
    });

    $('#desinscribir').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data().id;
        $("#inscripcionID").val(id);
    });
    
    $('#informacion').on('show.bs.modal', function(e) {
        var texto = $(e.relatedTarget).data().text;
        $(".informacion-ventana").html(texto);
    });

    $("body").on("click", "#matricula_alumno", function(){
        var id          = $(this).data("matricula"),
            params      = new URLSearchParams(window.location.search);
    
        params.set("alumno", id);
        params.toString();
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
        location.reload();
    });

    $('body').on('input', '#buscar_alumno',function(e){
        var rut = $(this).val();
        if (rut.length > 7) {
    
            $('#ofertas option:selected').each(function(){
                oferta = $(this).val();
            });
    
            $.post(
                'mantenedores/registro_academico/inscripcion_adv_regular_action.php', 
                {
                    action: 'busqueda_alumno', 
                    oferta: oferta,
                    rut   : rut
                }, 
                function(data) {
                    if(data == 0) {
                        $(".card-text").html("<br><div class='alert alert-danger alert-dismissible text-center'>Alumno no encontrado</div>");
                    } else {
                        var datos = jQuery.parseJSON(data); 
                        $(".card-text").html("<br>\
                        <div class='alert alert-success alert-dismissible text-center'>" + datos[1] + " " + datos[2] + " " + datos[3] + " &nbsp;&nbsp;&nbsp;<button class='btn btn-info btn-sm' data-matricula='" + datos[0] + "' id='matricula_alumno' title='Inscribir'><span class='glyphicon glyphicon-eye-open'></span></button></div>");
                    }
                }
            );
        }
    });

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


    $('#excepciones').on('show.bs.modal', function(e) {
        var curso = $(e.relatedTarget).data().curso;
        var oferta = $(e.relatedTarget).data().oferta;
        var asignatura = $(e.relatedTarget).data().asignatura;
        
        $.post('mantenedores/registro_academico/inscripcion_adv_regular_action.php', { action:'ver_excepciones', curso:curso, oferta:oferta, asignatura:asignatura}, function(data){
            $('.respuesta-excepciones').html(data);
        })
    });

    $('body').on('click', '#id_curso', function(){
        var nro     = $(this).data('nro');
        var codigos = $('#codigos' + nro);
        var cupo = $('#cupo' + nro); 
        if ($(this).is(':checked')) {
            codigos.prop('checked', this.checked);
            cupo.prop('checked', this.checked);
        } else {
            codigos.prop('checked', false);
            cupo.prop('checked', false);
        }
    });
    
        $('#datatableReprobados').DataTable({
        "scrollY": "40vh",
        "scrollCollapse": true,
        "paging": true,
        "iDisplayLength": 25,
        "info": false,
        "bDestroy": true,
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar",
            "zeroRecords": "No se encontraron coincidencias",
            "paginate": {
                "previous": "Anterior",
                "next": "Siguiente"
            }
        },
        aaSorting: [],
        dom: 'Bfrtip',
        buttons: [
            { extend: 'excel', text:'Excel', className: 'btn btn-success btn-sm' },
        ]
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');

})
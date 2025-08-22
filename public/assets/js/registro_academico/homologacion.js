$(document).ready(function () {

    $('#cohortes').change(function(){
        $('#cohortes option:selected').each(function(){
            var cohorte=$(this).val();

            $.post(
                'mantenedores/registro_academico/homologacion_action.php', 
                {
                    action:'ofertas_por_cohorte', 
                    cohorte: cohorte
                }, 
                function(data) {
                    $('#ofertas').html(data);
                }
            );
        });
    });

    $('#dtDynamicHomologar').DataTable({
        "scrollY": "50vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "ordering": false,
        "searching":false
    });
    $('.dataTables_length').addClass('bs-select');

    $('#myModalGeneral').on('show.bs.modal', function(e) {
        var action = $(e.relatedTarget).data().action;

        if(action == "asignatura_nueva") {

            var oferta = $(e.relatedTarget).data().oferta;

            $('.modal-title').html("Crear Asignatura a Homologar");
    
            $.post(
                'mantenedores/registro_academico/homologacion_action.php', 
                {
                    action: 'asignatura_nueva', 
                    oferta: oferta
                }, 
                function(data){
                    $('.modal-body-homologar').html(data);
                }
            );
        }
    });

    $("body").on("click", "#ver_alumnos", function(){
        var curso = $(this).data("curso");
        var params      = new URLSearchParams(window.location.search);

        params.set("curso", curso);
        params.toString();
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
        location.reload();
    });

    $("body").on("click", "#volver", function(){
        var params      = new URLSearchParams(window.location.search);

        params.set("curso", "all");
        params.toString();
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
        location.reload();
    });

    $('body').on('input', '#busqueda',function(e){
        var rut = $(this).val();
        if (rut.length >= 7) {

            var curso  = $("#id_curso").val();
            var oferta = $("#id_oferta").val();
    
            $.post(
                'mantenedores/registro_academico/homologacion_action.php', 
                {
                    action: 'busqueda_alumno', 
                    oferta: oferta,
                    rut   : rut,
                    curso:curso
                }, 
                function(data) {
                    if(data == 0) {
                        console.log(data);
                        $("#respuesta").html("<br><div class='alert alert-danger alert-dismissible text-center'>Error: por favor notificar a soporte</div>");
                    } else if(data == 1) {
                        $("#respuesta").html("<br><div class='alert alert-danger alert-dismissible text-center'>El alumno ya se encuentra inscrito de manera regular, por favor eliminar inscripción antes de homologar</div>");
                    } else if(data == 2) {
                        $("#respuesta").html("<br><div class='alert alert-danger alert-dismissible text-center'>Alumno no encontrado</div>");
                    } else {
                        console.log(data);
                        var datos = jQuery.parseJSON(data); 
                        $("#respuesta").html("<br>\
                        <input type='hidden' name='id_matricula' value='" + datos[0] + "'>\
                        <div class='alert alert-info alert-dismissible text-center'>" + datos[1] + " " + datos[2] + " " + datos[3] + "</div>");
                    }
                }
            );
        }
    });
})
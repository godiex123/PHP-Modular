$(document).ready(function(){

    $('#cohortes').change(function(){
        $('#cohortes option:selected').each(function(){
            cohorte = $(this).val();

            $.post('mantenedores/registro_academico/rectificacion_actas_action.php', {action: 'programas_con_cursos_creados', cohorte:cohorte}, function(data){
                $('#ofertas').html(data);
            });
        });
    });

    $('#ofertas').change(function(){
        $('#ofertas option:selected').each(function(){
            ofertaID=$(this).val();
            cursos_por_oferta_select = "";
            $.post('mantenedores/registro_academico/rectificacion_actas_action.php', {action: 'cursos_por_oferta_select', ofertaID:ofertaID}, function(data){
                $('#cursos').html(data);
            });
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

    $("body").on("click", "#ajustar_nota", function(){
        var asig        = $(this).data("id"); 
        var params      = new URLSearchParams(window.location.search);
    
        params.set("alumno", asig);
        params.toString();
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
        location.reload();
    });

    $("body").on("click", "#botonVolver", function(){
        var params      = new URLSearchParams(window.location.search);
    
        params.set("alumno", "all");
        params.toString();
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
        location.reload();
    });

    $("body").on("click", "#botonVolverAsig", function(){
        var params      = new URLSearchParams(window.location.search);
    
        params.set("asignatura", "all");
        params.toString();
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
        location.reload();
    });


    $('#cursos').change(function(){
        $('#cursos option:selected').each(function(){
            cursoID=$(this).val();
            select_alumnos_curso = "";
            $.post('mantenedores/registro_academico/rectificacion_actas_action.php', {action: 'select_alumnos_curso', cursoID:cursoID}, function(data){
                $('#alumnos').html(data);
            });
        });
    })
    $('#dataTableNota').DataTable({
        "scrollY": "50vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "ordering": false,
        "searching":false
    });
    $('.dataTables_length').addClass('bs-select');

    $('#dataTableAjuste').DataTable({
        "scrollY": "50vh",
        "scrollCollapse": true,
        "paging": false,
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
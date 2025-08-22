$(document).ready(function(){
    $('#cohortes').change(function(){
        $('#cohortes option:selected').each(function(){
            var cohorte=$(this).val();
            var ofertas_por_cohorte = "";
            $.post('mantenedores/registro_academico/programacion_asignaturas_action.php', {action:'ofertas_por_cohorte', cohorte:cohorte}, function(data){
                $('#ofertas').html(data);
            });
        });
    });
    /*$('#eliminar-curso').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        var id_curso_del = $(e.relatedTarget).data().id;
        $(e.currentTarget).find('#id_curso_del').val(id_curso_del);
    });

    $('.delete-profesor').click(function() {
        var profesorID = $(this).data().row_id;
        var cursoID = $(this).data().curso;
        var eliminar_profesor_curso="";
        $.post('mantenedores/registro_academico/controladorNotas.php', {action:'eliminar_profesor_curso', profesorID: profesorID, cursoID:cursoID}, function(data) {
            $('#mensajes').html(data);
        });
    });

    $('#agregar-profesor').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        var id_cp = $(e.relatedTarget).data().id;
        $(e.currentTarget).find('#curso_profesor').val(id_cp);
    });
    $('#datos-curso').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        var cursoID = $(e.relatedTarget).data().id;
        var datos_curso ="";
        $.post('mantenedores/registro_academico/controladorNotas.php', {action:'datos_curso', cursoID:cursoID}, function(data){
            $('#data-curso').html(data);
        });
    });*/

    $('#dtDynamicVerticalScrollExample').DataTable({
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
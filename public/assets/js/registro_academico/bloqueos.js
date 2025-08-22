$(document).ready(function(){
    $('#myModalDesbloquear').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data().id,
            alumno = $('#id_alumno').val(id);
    });

    $('#myModalBloquear').on('show.bs.modal', function(e) {
        var cohorte = $(e.relatedTarget).data().cohorte;
        $('#modal_id_cohorte').val(cohorte);
            
    });

    $('body').on('click', '#bloquear_por_cohorte', function(){
        var cohorte = $('#modal_id_cohorte').val();
        $('.spinner').css({'display': 'flex', 'justify-content': 'center', 'padding': '3rem'});
        $('.butt').css('display', 'none');
        $('.bloqueo_titulo').html('Ejecutando proceso.. <br><small class="text-muted text-center">(Esto puede tomar varios minutos)</small>');
        $.post('mantenedores/registroAcademico/controladorNotas.php', {action: 'bloqueo_por_cohorte', cohorte:cohorte}, function(data, status){
            if(status == 'success') {
                toastr.success('Proceso ejecutado con éxito', 'Bien');
            } else {
                toastr.error('Fallo en la ejección del proceso', 'Error');
            }
            setTimeout(function() {
                location.reload();
            }, 2000);
        })
    })
    $('#dtDynamicBloqueados').DataTable({
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
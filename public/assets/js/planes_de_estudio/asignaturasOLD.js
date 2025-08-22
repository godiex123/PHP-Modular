$(document).ready(function(){
    $('#modificar-asignatura').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('#nueva-asignatura').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
    });



    
$('#programa-existente').on('show.bs.modal', function(e) {
    $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));

    var id_de_decreto = $("#id_decreto").val();

    $.post("mantenedores/planes_de_estudio/asignaturas_action.php", {
        action: 'asignaturas_mantener',
        id_del_decreto: id_de_decreto
    }, function(data) {
        $('#cuerpo_asignaturas').html(data);
        // Agregar la barra de desplazamiento al contenedor
        $('#cuerpo_asignaturas').css('overflow-y', 'scroll');
        $('#cuerpo_asignaturas').css('max-height', '400px');

        const checkboxSeleccionarTodos = document.getElementById('seleccionar_todos');
        const checkboxesAsignaturas = document.querySelectorAll('input[name="id_asignaturas[]"]');

        checkboxSeleccionarTodos.addEventListener('change', function() {
            checkboxesAsignaturas.forEach(checkbox => {
                checkbox.checked = checkboxSeleccionarTodos.checked;
            });
            obtenerAsignaturasSeleccionadas(); // Llamar a la función al cambiar el estado de "Seleccionar Todos"
        });
    });
});

function obtenerAsignaturasSeleccionadas() {
    const checkboxesAsignaturas = document.querySelectorAll('input[name="id_asignaturas[]"]');
    const idsSeleccionados = Array.from(checkboxesAsignaturas)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Guardar los IDs seleccionados en el campo oculto del formulario
    document.getElementById('ids_seleccionados_input').value = idsSeleccionados.join(',');

    // Ahora podemos enviar el formulario
    document.getElementById('miFormulario').submit();
}




    $('#pre-requisito-asignatura').on('show.bs.modal', function(e) {
        //esta variable deja en blanco al abrir otra modal, y no quedan con los datos pasados
        $(this).find('#Cuadro3').html('');
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        var id_asig_prerequisito = $(e.relatedTarget).data().id;
        var id_decreto_prerequisito = $(e.relatedTarget).data().decreto;
        var titulo = $(e.relatedTarget).data().titulo;
        $("#titulo").html(titulo);
        $("#id_asig_prerequisito").val(id_asig_prerequisito);
        $("#id_decreto_prerequisito").val(id_decreto_prerequisito);

        $.post("mantenedores/planes_de_estudio/asignaturas_action.php",{id_asig_prerequisito1 : id_asig_prerequisito}, function(e){
            $("#Cuadro1").html(e);
                    // Agregar la barra de desplazamiento al contenedor
        $('#Cuadro1').css('overflow-y', 'scroll');
        $('#Cuadro1').css('max-height', '400px');
        });

        $.post('mantenedores/planes_de_estudio/asignaturas_action.php', 
        { action: 'select_option_asignaturas_prerequisitos_periodo',
        },
        function(data){
            $('#Cuadro2').html(data);
        });
    });    


    $('body').on('change', '.selectRegistrarPrerequisitos', function(){
        var id_opcion = $(this).val();
        var id_asig_prerequisito_modal = $("#id_asig_prerequisito").val();
        var id_decreto_prerequisito_modal = $("#id_decreto_prerequisito").val();

        //console.log(numero_modal);
        $.post('mantenedores/planes_de_estudio/asignaturas_action.php', 
        { action: 'asignatura_checkbox',
          id_opcion: id_opcion,
          id_asig_pre: id_asig_prerequisito_modal,
          id_decre_pre: id_decreto_prerequisito_modal
        },
        function(data){
            $('#Cuadro3').html(data);
        });

    
    });


    $(document).on("click","#eliminar-prerequisito",function(){
        var id_eliminar_prerequisito = $(this).data("id_eliminar_prerequisito");
        
        $.post("mantenedores/planes_de_estudio/asignaturas_action.php",{id_eliminar_prerequisito : id_eliminar_prerequisito}, function(e){
            if(e == "si") {
                toastr.success("Registro eliminado", "¡Bien!");
            } else {
                toastr.error("Error al eliminar", "¡Error!");
            }
            setTimeout(function() {
                location.reload();
            }, 600);
        });
    });

    $('body').on('click', '#eliminar_doc_asig', function(){
        var file = $(this).data('file'),
            id = $(this).data('id');
        $.post('mantenedores/planes_de_estudio/asignaturas_action.php', {delete_doc:'delete', file:file, id:id}, function(res){
            if(res == "si") {
                toastr.success("Documento eliminado", "¡Bien!");
            } else {
                toastr.error("Error al eliminar documento", "¡Error!");
            }
            setTimeout(function() {
                location.reload();
            }, 700);
        })

    })

    $('#eliminar-asignatura').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        $("#id_asig_del").val(id);
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    $('#DatatablePde').DataTable({
        "scrollY": "55vh",
        "scrollCollapse": true,
        "paging": false,
        "order": false,
        "bDestroy": true,
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
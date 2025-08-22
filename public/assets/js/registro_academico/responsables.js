$(document).ready(function(){

    $('#DT_responsables_general').DataTable({
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

    $('#DT_responsables_director').DataTable({
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

    // Obtén la referencia al div con id "decretos"
    const decretosDiv = document.getElementById("decretos");

    // Establece la altura máxima para el div
    decretosDiv.style.maxHeight = "75px"; // Puedes ajustar la altura máxima según tus necesidades

    // Agrega la propiedad de desplazamiento vertical cuando el contenido exceda la altura máxima
    decretosDiv.style.overflowY = "auto";




    
    $('#facultades').change(function(){
        $('#facultades option:selected').each(function(){
            var id  = $(this).val();

            if(id > 0) {
                $.post(
                    'mantenedores/registro_academico/responsables_action.php', 
                    { 
                        action: 'decretos_por_facultad', 
                        facultad:id,
                    }, 
                    function(data) {
                        $('#decretos').html(data);

                        const checkboxMaster = document.getElementById('all');
                        const checkboxItems = document.querySelectorAll('.checkbox-item');
                    
                        checkboxMaster.addEventListener('change', function() {
                            const isChecked = checkboxMaster.checked;
                            checkboxItems.forEach(function(checkbox) {
                                checkbox.checked = isChecked;
                            });
                        });
                    }
                );   
            }
        });
    });

    $("body").on("click", "#eliminarResponsable", function(){
        var id = $(this).data("id");
        $("#id_responsable_eliminar").val(id);
    });

    $("body").on("click", "#eliminarResponsableDirector", function(){
        var id = $(this).data("id");
        $("#id_responsable_eliminar_director").val(id);
    });
})
$(document).ready(function(){
    
    $('#datatabledirectores').DataTable({
        "paging": true,
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
        }
    });

    $('#cambiar').on('show.bs.modal', function(e) {
        $('.input_oferta').html($(e.relatedTarget).data('codigo_oferta'));
    });

    $('#buscar_director').on('click', function() {
        var rut = $('#rut_profesor').val();
        if (rut) {
            $.ajax({
                url: 'mantenedores/configuracion/directores_action.php',
                type: 'POST',
                data: {
                    action: 'buscar_director',
                    rut_profesor: rut
                },
                success: function(response) {
                    var datos = JSON.parse(response);
                    if (datos.success && datos.director.length > 0) {
                        var director = datos.director[0];
                        $('#resultados_busqueda').show();
                        $('#datos_director').html(
                            '<strong>Docente Encontrado:</strong><br>' +
                            '<strong>Nombre:</strong> ' + director.nombre_director + '<br>' +
                            '<strong>RUT:</strong> ' + director.rut + '<br>' +
                            '<strong>Correo:</strong> ' + director.correo + '<br><br>' +
                            '<input type="hidden" name="id_profesor" id="id_profesor" value="' + director.id_profesor + '" class="btn btn-info">' +
                            '<input name="cambiar" type="submit" value="Cambiar" class="btn btn-info">&nbsp;' +
                            '<button data-dismiss="modal" class="btn btn-danger">Cancelar</button>'
                        );
                    } else {
                        $('#resultados_busqueda').show();
                        $('#datos_director').html('<p>RUT no encontrado.</p>');
                    }
                },
                error: function() {
                    $('#resultados_busqueda').show();
                    $('#datos_director').html('<p>Error de búsqueda.</p>');
                }
            });
        } else {
            $('#resultados_busqueda').show();
            $('#datos_director').html('<p>Por favor, ingrese un RUT válido.</p>');
        }
    });

});
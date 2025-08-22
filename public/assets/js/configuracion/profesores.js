$(document).ready(function(){
    
    $('.loader').fadeOut(1000);
    $('.listadoProfesores').fadeIn(1000);
    
    $('#modificar').on('show.bs.modal', function(e) {
        $('.debug-url-mod').html($(e.relatedTarget).data('fulltext'));
    });

    $('#nueva').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
    });

    $('#eliminar').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        var cv = $(e.relatedTarget).data('cv');
        $("#id_profesor_eliminar").val(id);
        $("#cv_eliminar").val(cv);
    });

    $('#crearCuentaProfesor').on('show.bs.modal', function(e) {
        $('#nombreprofesor').html(' <strong> ' + $(e.relatedTarget).data('nombre') + ' </strong> ');
        $('#id_profesor_generar').val($(e.relatedTarget).data('id'));
    });

    $('#datatabletitulacion').DataTable({
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
        }
        // ,
        // aaSorting: [],
        // dom: 'Bfrtip',
        // buttons: [
        //     { extend: 'excel', text:'Excel', className: 'btn btn-success btn-sm' },
        // ]
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');

    //Enviar_credencial
    $('body').on('click', '#boton_enviarCredencial', function() {
        var nombre = $(this).data('nombre'),
        rut = $(this).data('rut');

        $('#nombreprofesor_reenvio').html(' <strong> ' + nombre + ' </strong> ');
        $('#rut_profesor_reenvio').val(rut);
    });

});
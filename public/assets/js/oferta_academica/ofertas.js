$(document).ready(function(){
    // Nueva version
    $('#nueva-version').on('show.bs.modal', function(e) {
        $('.select2').select2({
            placeholder: "Busque por RUT o apellido",
            allowClear: true,
            width: '100%', // importante para que no se vea roto
            dropdownParent: $('#nueva-version')
        });
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
    });

    // Modificar version
    $('#modificar-version').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
        $('#datepicker_mod').datepicker({
            dateFormat: "dd-mm-yy",
            minDate: new Date('2019-04-01'),
            maxDate: new Date('2030-12-31'),
            closeText: 'Cerrar',
            prevText: '< Ant',
            extText: 'Sig >',
            currentText: 'Hoy',
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
            dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        }).css('z-index', '1600');
        $('.select2').select2({
            placeholder: "Busque por RUT o apellido",
            allowClear: true,
            width: '100%', // importante para que no se vea roto
            dropdownParent: $('#modificar-version')
        });
    });

    // Eliminar version
    $('#eliminar-version').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        $('#id_oferta_del').val(id);
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    // Publicar version
    $('#publicar-version').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        $('#id_oferta_pub').val(id);
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    // Despublicar version
    $('#despublicar-version').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        $('#id_oferta_despub').val(id);
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    // Subir web
    $('#subir-web').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        $('#id_oferta_web').val(id);
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    // Bajar web
    $('#bajar-web').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        $('#id_oferta_web').val(id);
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    // Activar version
    $('#activar-version').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        $('#id_oferta_act').val(id);
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    // Suspender version
    $('#suspender-version').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        $('#id_oferta_sus').val(id);
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    $( function() {
    $("#datepicker").datepicker({
        dateFormat: "dd-mm-yy",
        minDate: new Date('2019-04-01'),
        maxDate: new Date('2030-12-31'),
        closeText: 'Cerrar',
        prevText: '< Ant',
        extText: 'Sig >',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
    });
    } );

    // Datatable
    $('#DatatableOA').DataTable({
        /*"scrollY": "55vh",*/
        "scrollCollapse": true,
        "paging": false,
        "bDestroy": true,
        "info": false,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Buscar...",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');
})
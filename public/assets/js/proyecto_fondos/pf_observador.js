$(document).ready(function(){
    $('#listadoConvocatorias').DataTable({
        "scrollY": "49vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "bDestroy": true,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');

    $('#listadoExternas').DataTable({
        "scrollY": "49vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "bDestroy": true,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');

    $('#listadoInternas').DataTable({
        "scrollY": "49vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "bDestroy": true,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');
});
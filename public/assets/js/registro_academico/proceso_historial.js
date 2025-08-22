$(document).ready(function () {
    
    $.fn.dataTable.ext.order['dom-checkbox-icon'] = function (settings, col) {
        return this.api().column(col, {order: 'index'}).nodes().map(function (td, i) {
            // Ícono
            if ($(td).find('.glyphicon-check').length > 0) {
                return '1';
            // Checkbox
            } else if ($(td).find('input[type="checkbox"]').length > 0) {
                return $(td).find('input[type="checkbox"]').prop('checked') ? '1' : '0';
            // Default
            } else {
                return '0';
            }
        });
    };
    
    $('#datatabletitulacion').DataTable({
        "scrollY": "50vh",
        "scrollCollapse": true,
        "paging": true,
        "info": false,
        "ordering": true,
        "searching":true,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar",
            "zeroRecords": "No se encontraron coincidencias"
        },
        "columnDefs": [
            { 
                "targets": 8, // Para ordenar última columna, DEC5
                "orderDataType": "dom-checkbox-icon"
            }
        ]
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');
    
    
})
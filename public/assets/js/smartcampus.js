$(document).ready(function(){
    /**
    *  Pantalla de inicio
    */
     $('#DatatableInicio').DataTable({
        "scrollY": "30vh",
        "scrollCollapse": true,
        "paging": false,
        "bDestroy": true,
        "info": false,
        "searching": false,
        "language": {
            "zeroRecords": "No hay movimientos"
        }
    });  
})
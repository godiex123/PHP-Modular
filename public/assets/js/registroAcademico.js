
/*
    Tabla dinamica de las vistas
*/
$(document).ready(function () {
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
});

$(document).ready(function(){
    if(window.location.search.indexOf('msg=0') > 0){
        toastr.error("Error en la operacion!");
    }
    if(window.location.search.indexOf('msg=1') > 0){
        toastr.success("Realizado con Exito!");
    }
    if(window.location.search.indexOf('msg=3') > 0){
        toastr.error("Accion detenida: El curso tiene notas ingresadas.");
    }
    if(window.location.search.indexOf('msg=4') > 0){
        toastr.error("Accion detenida: Ya cuenta con el maximo de profesores por curso.");
    }
    if(window.location.search.indexOf('msg=5') > 0){
        toastr.error("Accion detenida: Debe haber al menos un profesor por curso.");
    }
    if(window.location.search.indexOf('msg=6') > 0){
        toastr.error("Accion detenida: No selecciono nota a ingresar.");
    }
    if(window.location.search.indexOf('msg=8') > 0){
        toastr.error("Accion detenida: No selecciono alumnos para inscripcion.");
    }
});
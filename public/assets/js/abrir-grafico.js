$(document).ready(function(){ 
    $('#alternar-panel-oculto').toggle( 
        function(e){ 
            $('#panel-oculto').slideDown();
            $(this).text('Cerrar resúmen');
            e.preventDefault();
        },
        function(e){ 
            $('#panel-oculto').slideUp();
            $(this).text('Mostrar resúmen');
            e.preventDefault();
        } 
    ); 
});
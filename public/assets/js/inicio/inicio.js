$(document).ready(function(){
    $('#panel').click(function(){
        var usuario = document.getElementById('usuario').value;
        $.post('mantenedores/registro_academico/controladorNotas.php', {action:'log_panel', usuario:usuario}, function(data){
        });
    })

    $("body").on("click", "#insPost", function(){
        window.location.href = "inscripcion_postgrado.php";
    });

    $("body").on("click", "#monitorTitu", function(){
        window.location.href = "avance_titulacion.php";
    });

    $("body").on("click", "#insAdv", function(){
        window.location.href = "inscripcion_adv_regular.php";
    });

    $("body").on("click", "#expEst", function(){
        window.location.href = "expedientes.php";
    });

    $("body").on("click", "#libroCE", function(){
        
        $('body').waitMe({
            effect : 'rotation',
            text : 'Ingresando...',
            bg : 'rgba(255,255,255,0.7)',
            color : '#000',
            maxSize : '', 
            waitTime : -1,
            textPos : 'vertical',
            fontSize : '',
            source : '',
            onClose : function() {} 
        });
                    
        window.location.href = "libro_de_actas.php";
    });

    $("body").on("click", "#monitorAsig", function(){
        window.location.href = "avance_asignaturas.php";
    });



    $("body").on("click", "#salir", function(){
        window.location.href = "salir.php";    });
})

$(".check_habilitar").change(function() {
    if(this.checked) {
        $(".r_hab").css({
            "display": "flex",
            "justify-content": "space-evenly"
        });
    } else {
        $(".r_hab").css("display", "none");
        $(".r_fechas").css("display", "none");
    }
});
$("#inlineRadioSi").on("click", function() {
    if(this.checked) {
        $(".r_fechas").css("display", "block");
    }
});
$("#inlineRadioNo").on("click", function() {
    if(this.checked) {
        $(".r_fechas").css("display", "none");
    }
});

$(function(){
    $("#fecha_inicio").datepicker({
        dateFormat: "dd-mm-yy"
    });
});
$(function(){
    $("#fecha_fin").datepicker({
        dateFormat: "dd-mm-yy"
    });
});
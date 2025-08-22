$(document).ready(function(){
    $(".horaCierreExterno").timepicker().on("change", function(){
        $(".horaCierreInterno").val("");
        var fecha_externa = $('#fecha_cierre').val(),
            fecha_interna = $('#fecha_maxima').val();

        if(fecha_externa == fecha_interna) {
            var time = this.value.split(":"),
                hora = parseInt(time[0]),
                min  = parseInt(time[1]);
            if(30 > min) {
                var diff     = 30 - min,
                    new_min  = 60 - diff,
                    new_hora = hora - 1;
            } else {
                var new_min  = min - 30,
                    new_hora = hora;
            }
            if(new_min > 0) {
                max_time = new_hora + ":" + new_min;
            } else {
                max_time = new_hora + ":0" + new_min;
            }
            $(".horaCierreInterno").timepicker({
                maxTime: max_time
            });
        } else {
            $(".horaCierreInterno").timepicker();        
        }
    })
})

$(function(){
    $("#fecha_cierre").datepicker({
        dateFormat: "dd-mm-yy",
        minDate: 0,
        onSelect: function(dateText) {
            $("#fecha_maxima").datepicker('destroy');
            var from = this.value.split("-");
                date = new Date(from[2], from[1] - 1, from[0]);
            date.setDate(date.getDate());
            date = date.getDate() + "-" + (+date.getMonth() + +1) + "-" + date.getFullYear();
            $("#fecha_maxima").datepicker({
                dateFormat: "dd-mm-yy",
                minDate: 0,
                maxDate: date,
                onSelect: function(dateText) {
                    $(".horaCierreInterno").val("");
                    var fecha_externa = $('#fecha_cierre').val(),
                        fecha_interna = $('#fecha_maxima').val();

                    if(fecha_externa == fecha_interna) {
                        var time = $('#hora_cierre').val().split(":"),
                            hora = parseInt(time[0]),
                            min  = parseInt(time[1]);
                        if(30 > min) {
                            var diff     = 30 - min,
                                new_min  = 60 - diff,
                                new_hora = hora - 1;
                        } else {
                            var new_min  = min - 30,
                                new_hora = hora;
                        }
                        if(new_min > 0) {
                            max_time = new_hora + ":" + new_min;
                        } else {
                            max_time = new_hora + ":0" + new_min;
                        }
                        $(".horaCierreInterno").timepicker({
                            maxTime: max_time
                        });
                    } else {
                        $(".horaCierreInterno").timepicker();        
                    }
                }
            })
        }
    });
});

$("body").on("click", "#boleta_garantia", function(){
    if($(this).is(":checked")) {
        $("#monto_garantia").attr("readonly", false);
        $("#monto_garantia").css("background-color", "#FFF");
    } else {
        $("#monto_garantia").attr("readonly", true);
        $("#monto_garantia").css("background-color", "#CCC");
        $("#monto_garantia").val("");
    }
})

$("body").on("click", "#delete_archivo", function(){
    var id = $(this).data("id"),
        file= $(this).data("file");
    $.post("mantenedores/proyecto_fondos/pf_action.php", {action:"delete_archivo", id:id, file:file}, function(data){
       //location.reload();
    })
})
$("body").on("click", "#delete_fase", function(){
    var id = $(this).data("id");
    $.post("mantenedores/proyecto_fondos/pf_action.php", {action:"delete_fase", id:id}, function(data){
        location.reload();
    })
})
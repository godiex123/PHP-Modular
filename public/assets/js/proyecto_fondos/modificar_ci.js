$(document).ready(function(){
    $("body").on("click", "#delete_archivo", function(){
        var id = $(this).data("id"),
            file= $(this).data("file");
        $.post("mantenedores/proyecto_fondos/pf_action.php", {action:"delete_archivo_interno", id:id, file:file}, function(data){
            location.reload();
        })
    })
    $(function(){
        $("#fecha_cierre").datepicker({
            dateFormat: "dd-mm-yy",
            minDate: 0
        });
    });
})
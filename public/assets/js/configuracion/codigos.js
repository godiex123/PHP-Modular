$(document).ready(function(){
    $("body").on("click", "#modificar", function(){
        var id   = $(this).data("id"),
            ucen = $(this).data("ucen"),
            sig  = $(this).data("sig");

        $("#id").val(id)
        $("#codplan").val(ucen);
        $("#codsig").val(sig);
        $("#btnaction").attr("name", "modificar");
        $(".titulo").html("Modificar Código");
    })

    $('#DTcodigos').DataTable({
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
})
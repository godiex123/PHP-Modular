$(document).ready(function(){
    $("body").on("click", "#select_anio", function(){
        var anio = $(this).data("anio");
        var params      = new URLSearchParams(window.location.search);

        params.set("a", anio);
        params.toString();
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
        location.reload();
    });
})
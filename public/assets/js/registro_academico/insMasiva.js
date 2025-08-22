$(document).ready(function() {
    $("#carga").click(function() {
        // disable button
        $('#cancelar').hide();
        $('#texto').hide();
        $('#cerrar').hide();

        $(this).prop("", true);
        $(this).addClass("buttonload");
        $(this).removeClass("BtnActivoRojo");
        // add spinner to button
        $(this).html(
            `<i class="fa fa-refresh fa-spin"></i>Inscribiendo`
        );
    });

    $('#alumnosDisponibles').on('show.bs.modal', function(e) {
        var curso = $(e.relatedTarget).data().curso;
        var oferta = $(e.relatedTarget).data().oferta;
        var titulo = $(e.relatedTarget).data().titulo;
        var alumnos_masiva = '';
        $.post('mantenedores/registro_academico/controladorNotas.php', {action:"alumnos_masiva", curso:curso, oferta:oferta}, function(data){
            $('.titulo-cod').html(titulo)
            $('#disponibles').html(data);
        })
    });
    $('#modal_panel').on('show.bs.modal', function(e) {
        var cohorte = $(e.relatedTarget).data().cohorte;
        var tipo = $(e.relatedTarget).data().tipo;
        var ofertados = '';
        $.post('mantenedores/registro_academico/controladorNotas.php', {action:"ofertados", cohorte:cohorte, tipo:tipo}, function(data){
            $('#data_panel').html(data);
        })
    });
    $('input:checkbox').click(function(){
        var todos = document.querySelectorAll('input[id="chk"]');
        var empty = [].filter.call( todos, function(el){
            return !el.checked
        })
        
        if (todos.length == empty.length)
        {
            $('#btn-act').attr('disabled', true);
        }
        else
        {
            $('#btn-act').attr('disabled', false);
        }
    });
})
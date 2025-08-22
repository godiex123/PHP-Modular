$(document).ready(function () {

    options             = {
        'effect' : 'timer', 
        'maxSize' : 40, 
        'text': 'Cargando informaci贸n',
        'color' : '#9FA6B2'
    };
    
    $('#revisar').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));                
        $('.debug-url').html(' <strong>' + $(e.relatedTarget).data('fulltext') + '</strong>');
        var nombres = $(e.relatedTarget).data('nombre');
        $('#nombre_modal').html(nombres);
        var programas = $(e.relatedTarget).data('programa');
        $('#programa_modal').html(programas);
        var decretos = $(e.relatedTarget).data('decreto');
        $('#decreto_modal').html(decretos);
        var matriculas = $(e.relatedTarget).data('matricula');
        $('#matricula_modal').val(matriculas);
        
        $.post('mantenedores/registro_academico/archivo_action.php', 
                { action: 'moda_checkbox',
                  id: matriculas
                },
                function(data){
                    $('#tabla-checkbox').html(data);
                }
        );
    });

    $('body').on('change', '#via_ingreso', function(){
    
        
        var id_via       = $(this).val();

        $.post('mantenedores/registro_academico/archivo_action.php', 
        { action: 'checkbox',
          id_via: id_via
        },
        function(data){
            $('#tabla-checkbox2').html(data);
        });

    
        // $.ajax({
        //     url: 'mantenedores/registro_academico/archivo_action.php',
        //     method: 'post',
        //     dataType: 'json',
        //     cache: false,
        //     data: { id_select: id_via }
        // })
        
        //console.log(id);
    
    });
    
    $('#finalizar').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));                
        $('.debug-url').html(' <strong>' + $(e.relatedTarget).data('fulltext') + '</strong>');
        var nombres = $(e.relatedTarget).data('nombre');
        $('#nombre_fin').html(nombres);
        var programas = $(e.relatedTarget).data('programa');
        $('#programa_fin').html(programas);
        var decretos = $(e.relatedTarget).data('decreto');
        $('#decreto_fin').html(decretos);
        var matriculas = $(e.relatedTarget).data('matricula');
        $('#matricula_fin').val(matriculas);

    });

    $('#editar').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));                
        $('.debug-url').html(' <strong>' + $(e.relatedTarget).data('fulltext') + '</strong>');
        var nombres = $(e.relatedTarget).data('nombres');
        $('#nombres_fin').html(nombres);
        var programas = $(e.relatedTarget).data('programas');
        $('#programas_fin').html(programas);
        var decretos = $(e.relatedTarget).data('decretos');
        $('#decretos_fin').html(decretos);
        var matriculas = $(e.relatedTarget).data('matriculas');
        $('#matriculas_fin').val(matriculas);

    });
    
});
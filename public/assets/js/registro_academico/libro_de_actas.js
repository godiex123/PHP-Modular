$(document).ready(function(){
    $('#programas').change(function(){
        $('#programas option:selected').each(function(){
            var oferta=$(this).val();
            var rut = document.getElementById('profesor').value;
            var gparams = $('#gParams').val();

            $.post(
                'mantenedores/registro_academico/libro_de_actas_action.php', 
                {
                    action:'cursos_de_un_profesor', 
                    rut:rut, 
                    oferta:oferta,
                    gparams:gparams
                }, 
                function(data){
                    $('#cursos').html(data);
                }
            );
        });
    });


    $('#dtDynamicVerticalScrollNotas').DataTable({
        "scrollY": "50vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "ordering": false,
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar Alumno",
            "zeroRecords": "No se encontraron coincidencias"
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');


    $('#nueva-nota').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        var a = $(e.relatedTarget).data().id;
        $(e.currentTarget).find('#curso').val(a);
    });

    $('body').on('click', '#btnBuscar', function(){
        $('body').waitMe({
            effect : 'rotation',
            text : 'Cargando...',
            bg : 'rgba(255,255,255,0.7)',
            color : '#000',
            maxSize : '', 
            waitTime : -1,
            textPos : 'vertical',
            fontSize : '',
            source : '',
            onClose : function() {} 
        });
    })

    $('body').on('click', '#btnCerrarActa', function(){
        $('body').waitMe({
            effect : 'rotation',
            text : 'Cerrando...',
            bg : 'rgba(255,255,255,0.7)',
            color : '#000',
            maxSize : '', 
            waitTime : -1,
            textPos : 'vertical',
            fontSize : '',
            source : '',
            onClose : function() {} 
        });
    })

    $('body').on('submit', '#validar', function(e){
        var top = document.getElementsByClassName('val');
        var b = [];
        for(var i=0; i<top.length; i++){
            if(top[i].value == ""){
                b.push(0);
            }
            else{
                b.push(parseFloat(top[i].value));
            }
        }
        var total = b.reduce(suma);
        console.log(total);

        if(total == 0){
            document.getElementById('msgError2').style.display = 'none';
            document.getElementById('msgError1').style.display = 'block';
            e.preventDefault();
            document.config_notas.valor1.focus()
        }
        else if(total < 100){
            document.getElementById('msgError1').style.display = 'none';
            document.getElementById('msgError2').style.display = 'block';
            e.preventDefault();
            document.config_notas.valor1.focus();
            return 0;  
        }
        else if(total > 100 || total == 1000){
            document.getElementById('msgError1').style.display = 'none';
            document.getElementById('msgError2').style.display = 'block';
            e.preventDefault();
            document.config_notas.valor1.focus();
            return 0; 
        }
    })
    /* Crear Inputs dinamicamente */ 
    $('body').on('click', '#btn_agregar', addInput);
    function addInput(){
        var mod = document.getElementsByClassName('mod');
        var val = document.getElementsByClassName('val');

        var label_tipo_nota_numerico = document.getElementsByClassName('label_tipo_nota_numerico');
        var tipo_nota_numerico = document.getElementsByClassName('tipo_nota_numerico');

        var label_tipo_nota_conceptual = document.getElementsByClassName('label_tipo_nota_conceptual');
        var tipo_nota_conceptual = document.getElementsByClassName('tipo_nota_conceptual');

        

        var nMod = mod.length + 1;
        var nVal = val.length + 1;

        var nLabel_tipo_nota_numerico = label_tipo_nota_numerico.length + 1;
        var nTipo_nota_numerico = tipo_nota_numerico.length + 1;

        var nLabel_tipo_nota_conceptual = label_tipo_nota_conceptual.length + 1;
        var nTipo_nota_conceptual = tipo_nota_conceptual.length + 1;
    
        /* Bloquear boton ADD al septimo input */
        if (nMod <= 8 && nVal <= 8){
            document.getElementById('btn_eliminar').setAttribute('style', 'display: inline;');
            $('#padre').append('<tr>\
                                <td id="td'+nMod+'"><input type="text" name="modulo'+nMod+'" class="form-control Input mod" readonly value="'+nMod+'"></td>\
                                <td id="td'+nVal+'"><input type="number" step=".01" name="valor'+nVal+'" class="form-control Input val" autocomplete="off"></td>\
                                <td id="td'+nTipo_nota_numerico+'">\
                                    <label for="nota_numerico'+nTipo_nota_numerico+'" class="label_tipo_nota_numerico">Numérico</label>\
                                    <input type="radio" id="nota_numerico'+nTipo_nota_numerico+'" class="tipo_nota_numerico" name="tipo_nota'+nTipo_nota_numerico+'" value="1">\
                                </td>\
                                <td id="td2_'+nTipo_nota_conceptual+'">\
                                    <label for="nota_conceptual'+nTipo_nota_conceptual+'" class="label_tipo_nota_conceptual">Conceptual</label>\
                                    <input type="radio" id="nota_conceptual'+nTipo_nota_conceptual+'" class="tipo_nota_conceptual" name="tipo_nota'+nTipo_nota_conceptual+'" value="2">\
                                </td>\
                              </tr>');
        } else {
              document.getElementById('btn_agregar').setAttribute('style', 'display: none;');
        }
      }
    
      /* Eliminar Inputs */
    $('body').on('click', '#btn_eliminar', delInput);
    function delInput(){
        var delMod          = document.getElementsByClassName('mod');
        var delVal          = document.getElementsByClassName('val');

        var delLabel_tipo_nota_numerico = document.getElementsByClassName('label_tipo_nota_numerico');
        var delTipo_nota_numerico = document.getElementsByClassName('tipo_nota_numerico');

        var delLabel_tipo_nota_conceptual = document.getElementsByClassName('label_tipo_nota_conceptual');
        var delTipo_nota_conceptual = document.getElementsByClassName('tipo_nota_conceptual');

        var nMod        = delMod.length;
        var nVal        = delVal.length;
        
        var nLabel_tipo_nota_numerico = delLabel_tipo_nota_numerico.length;
        var nTipo_nota_numerico = delTipo_nota_numerico.length;
        var nLabel_tipo_nota_conceptual = delLabel_tipo_nota_conceptual.length;
        var nTipo_nota_conceptual = delTipo_nota_conceptual.length;
    
        /* Bloquear DEL al quedar un input */
        if (nMod > 1 && nVal > 1){
            document.getElementById('btn_agregar').setAttribute('style', 'display: inline;');
            $('#td'+nMod).remove();
            $('#td'+nVal).remove();
            $('#td'+nTipo_nota_numerico).remove();
            $('#td2_'+nTipo_nota_conceptual).remove();            
        }else{
            document.getElementById('btn_eliminar').setAttribute('style', 'display: none;');
        }
    } 
    /* Suma de valores en un array */
    function suma(a, b){
          return a + b;
    }


    $('body').on('click', '#examen', function(){
        if($(this).is(':checked')) {
            $('.otro-examen').css('display', 'block');
        } else {
            $('.otro-examen').css('display', 'none');
        }
    });

    $('body').on('click', '#del_plantilla', function(){
        $('#ver-nota').modal('hide');
    });
})
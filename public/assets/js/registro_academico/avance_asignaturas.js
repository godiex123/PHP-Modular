$(document).ready(function(){
    $('#dataTableMonitor').DataTable({
        "scrollY": "40vh",
        "scrollCollapse": true,
        "paging": true,
        "iDisplayLength": 25,
        "info": false,
        "bDestroy": true,
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "search": "_INPUT_",
            "searchPlaceholder": "Filtrar",
            "zeroRecords": "No se encontraron coincidencias",
            "paginate": {
                "previous": "Anterior",
                "next": "Siguiente"
            }
        },
        aaSorting: [],
        dom: 'Bfrtip',
        buttons: [
            { extend: 'excel', text:'Excel', className: 'btn btn-success btn-sm' },
        ]
    });
    $('.dataTables_length').addClass('bs-select');
    $(".dataTables_filter :input").addClass('form-control');








    
    $('#porIniciar').on("click", function(){
        var cohorteID= document.getElementById('cohorteID').value;
        var tipo= document.getElementById('tipo').value;
        var cursos_por_iniciar = "";
        $.post('mantenedores/registro_academico/controladorNotas.php', {action:'cursos_por_iniciar',cohorteID:cohorteID, tipo:tipo}, function(data){
            $('#tabla').html(data);
            $('#dtDynamicVerticalScrollCursos').DataTable({
                "scrollY": "49vh",
                "scrollCollapse": true,
                "paging": false,
                "info": false,
                "bDestroy": true,
                "language": {
                    "search": "_INPUT_",
                    "searchPlaceholder": "Filtrar",
                    "zeroRecords": "No se encontraron coincidencias"
                }
            });
            $('.dataTables_length').addClass('bs-select');
            $(".dataTables_filter :input").addClass('form-control');
            window.scrollTo(0,document.body.scrollHeight);
        });
    })
    $('#iniciados').on("click", function(){
        $('#porIniciar').css({pointerEvents: "cursor"})
        var cohorteID= document.getElementById('cohorteID').value;
        var tipo= document.getElementById('tipo').value;
        var cursos_iniciados = "";
        $.post('mantenedores/registro_academico/controladorNotas.php', {action:'cursos_iniciados',cohorteID:cohorteID, tipo:tipo}, function(data){
            $('#tabla').html(data);
            $('#dtDynamicVerticalScrollCursos').DataTable({
                "scrollY": "49vh",
                "scrollCollapse": true,
                "paging": false,
                "info": false,
                "bDestroy": true,
                "language": {
                    "search": "_INPUT_",
                    "searchPlaceholder": "Filtrar",
                    "zeroRecords": "No se encontraron coincidencias"
                }
            });
            $('.dataTables_length').addClass('bs-select');
            $(".dataTables_filter :input").addClass('form-control');
            window.scrollTo(0,document.body.scrollHeight);
        });
    })
    $('#terminados').on("click", function(){
        var cohorteID= document.getElementById('cohorteID').value;
        var tipo= document.getElementById('tipo').value;
        var cursos_terminados = "";
        $.post('mantenedores/registro_academico/controladorNotas.php', {action:'cursos_terminados',cohorteID:cohorteID, tipo:tipo}, function(data){
            $('#tabla').html(data);
            $('#dtDynamicVerticalScrollCursos').DataTable({
                "scrollY": "49vh",
                "scrollCollapse": true,
                "paging": false,
                "info": false,
                "bDestroy": true,
                "language": {
                    "search": "_INPUT_",
                    "searchPlaceholder": "Filtrar",
                    "zeroRecords": "No se encontraron coincidencias"
                }
            });
            $('.dataTables_length').addClass('bs-select');
            $(".dataTables_filter :input").addClass('form-control');
            window.scrollTo(0,document.body.scrollHeight);
        });
    })
    $('#conNotas').on("click", function(){
        var cohorteID= document.getElementById('cohorteID').value;
        var tipo= document.getElementById('tipo').value;
        var cursos_con_notas = "";
        $.post('mantenedores/registro_academico/controladorNotas.php', {action:'cursos_con_notas',cohorteID:cohorteID, tipo:tipo}, function(data){
            $('#tabla').html(data);
            $('#dtDynamicVerticalScrollCursos').DataTable({
                "scrollY": "49vh",
                "scrollCollapse": true,
                "paging": false,
                "info": false,
                "bDestroy": true,
                "language": {
                    "search": "_INPUT_",
                    "searchPlaceholder": "Filtrar",
                    "zeroRecords": "No se encontraron coincidencias"
                }
            });
            $('.dataTables_length').addClass('bs-select');
            $(".dataTables_filter :input").addClass('form-control');
            window.scrollTo(0,document.body.scrollHeight);
        });
    })

    $('input[id$="chkcorreos"]').click(function(){
        var todos = document.querySelectorAll('input[id="chkcorreos"]');
        var empty = [].filter.call( todos, function(el){
            return !el.checked
        })
        
        if (todos.length == empty.length)
        {
            $('#btn-correos').attr('disabled', true);
        }
        else
        {
            $('#btn-correos').attr('disabled', false);
        }
    })

    $('#enviar_correo').on('click', function(e) {
        var cursos = [];
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
        for (var i=0; i < checkboxes.length; i++)
        {
            cursos.push(checkboxes[i].value);
        }
        var enviar_correo_profesores = '';
        $.post('mantenedores/registro_academico/controladorNotas.php', {action:"enviar_correo_profesores", cursos:cursos}, function(data){
            toastr.success("Correo enviado");
            $('#modal_profesores').modal('hide');
        })
    });

    /*
    |   Animacion de contador de numeros en los paneles
    */
    $('.count').each(function (_, self) {
        jQuery({ Counter: 0 }).animate({ Counter: $(self).text() }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $(self).text(Math.ceil(now));
            }
        });
    });

    var data1 = parseInt($('#data1').val());
    var data2 = parseInt($('#data2').val());
    var data3 = parseInt($('#data3').val());
    var data4 = parseInt($('#data4').val());
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart, $(window).resize(drawChart));
    function drawChart() {
        /*var data = google.visualization.arrayToDataTable([
            ['Cursos', '', { role: 'style' } ],
            ['Por Iniciar', 500, 'color: #76A7FA'],
            ['Iniciados', 500, 'opacity: 0.2'],
            ['Cerrados', 500, 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF;'],
            ['Con Notas', 500, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2']
        ]);*/
        var data = google.visualization.arrayToDataTable([
            ['fecha', 'Asignaturas', 'Por Iniciar', 'Iniciadas', 'Cerradas'],
            [   Date.now(),  1000,           400,            200,        15],
            [   Date.now(),  1000,           400,            200,        15],
            [   Date.now(),  1000,           400,            200,        15],
            /*['Por Iniciar',  1170,      460],
            ['Iniciadas',  660,       1120],
            ['Cerradas',  1030,      540]*/
          ]);
  

        /*var view = new google.visualization.DataView(data);*/
        
        var options = {
            height:350,
            title: "Grafica de Avance de Cursos",
            titleFontSize:20,
            titleFontName: 'Lato-Bold',
            titleColor:'#3d405c',
            bar: {groupWidth: "95%"},
            legend: { position: "none" },
            hAxis : { 
                textStyle : {
                    fontName: 'Lato-Bold',
                    fontSize: 20, // or the number you want
                    color: '#ff407b'
                }
            }
        };
        var chart = new google.visualization.AreaChart(document.getElementById("tabla"));
        chart.draw(data, options);
    }
});
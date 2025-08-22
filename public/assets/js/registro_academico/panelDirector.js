$(document).ready(function(){
    var data1 = parseInt($('#data1').val());
    var data2 = parseInt($('#data2').val());
    var data3 = parseInt($('#data3').val());
    var data4 = parseInt($('#data4').val());
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart, $(window).resize(drawChart));
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Cursos', '', { role: 'style' } ],
            ['Por Iniciar', data1, 'color: #76A7FA'],
            ['Iniciados', data2, 'opacity: 0.2'],
            ['Cerrados', data3, 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF;'],
            ['Con Notas', data4, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2']
        ]);

        var view = new google.visualization.DataView(data);
        
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
        var chart = new google.visualization.ColumnChart(document.getElementById("tabla"));
        chart.draw(view, options);
    }

    $('#porIniciarDir').on("click", function(){
        var cohorteID= document.getElementById('cohorteID').value;
        var rut= document.getElementById('rut').value;
        var cursos_por_iniciar_dir = "";
        $.post('mantenedores/registro_academico/controladorNotas.php', {action:'cursos_por_iniciar_dir',cohorteID:cohorteID, rut:rut}, function(data){
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
    $('#iniciadosDir').on("click", function(){
        $('#porIniciar').css({pointerEvents: "cursor"})
        var cohorteID= document.getElementById('cohorteID').value;
        var rut= document.getElementById('rut').value;
        var cursos_iniciados_dir = "";
        $.post('mantenedores/registro_academico/controladorNotas.php', {action:'cursos_iniciados_dir',cohorteID:cohorteID, rut:rut}, function(data){
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
    $('#terminadosDir').on("click", function(){
        var cohorteID= document.getElementById('cohorteID').value;
        var rut= document.getElementById('rut').value;
        var cursos_terminados = "";
        $.post('mantenedores/registro_academico/controladorNotas.php', {action:'cursos_terminados_dir',cohorteID:cohorteID, rut:rut}, function(data){
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
    $('#conNotasDir').on("click", function(){
        var cohorteID= document.getElementById('cohorteID').value;
        var rut= document.getElementById('rut').value;
        var cursos_con_notas_dir = "";
        $.post('mantenedores/registro_academico/controladorNotas.php', {action:'cursos_con_notas_dir', cohorteID:cohorteID, rut:rut}, function(data){
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

    $('.count').each(function (_, self) {
        jQuery({ Counter: 0 }).animate({ Counter: $(self).text() }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $(self).text(Math.ceil(now));
            }
        });
    });
})
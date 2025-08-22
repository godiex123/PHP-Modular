$(document).ready(function(){
    function inicio() { 
        $('#pto_equilibrio').val( $('#pto_equilibrio_inicial').val() ); 
    }

    $('#valores').on('show.bs.modal', function(e) {
        //$(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('#valores-reales').on('show.bs.modal', function(e) {
        //$(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
        inicio();
    });

    $('#presupuesto').on('show.bs.modal', function(e) {
        //$(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' ' + $(e.relatedTarget).data('fulltext') + ' ');
    });

    $('#compartir').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    $('#cargar').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
        $('.debug-url').html(' <strong> ' + $(e.relatedTarget).data('fulltext') + ' </strong> ');
    });

    function cambiar( objeto, tipo ) {
        var oldValue = objeto.oldvalue;
        var newValue = objeto.value;

        var horas_resolucion            = $('#horas_resolucion').val()            ;
        var horas_programa              = $('#horas_programa').val()              ;    // 1
        var horas_sin_tesis             = $('#horas_sin_tesis').val()             ;    // 2
        var horas_ahorro_articulacion   = $('#horas_ahorro_articulacion').val()   ;    // 3
        var horas_adicionales           = $('#horas_adicionales').val()           ;    // 
        var porc_desercion              = $('#porc_desercion').val()              ;    // 4
        var porc_morosidad              = $('#porc_morosidad').val()              ;    // 5
        var costo_director_fij          = $('#costo_director_fij').val()          ;    // 6
        var cuotas_director_fij         = $('#cuotas_director_fij').val()         ;    // 7
        var rem_coordinacion_fij        = $('#coordinacion_fij').val()            ;    // 8
        var valor_hora_fij              = $('#valor_hora_fij').val()              ;    // 9
        var rem_honorarios_fij          = $('#honorarios_fij').val()              ;    // 10
        var rem_titulacion_fij          = $('#titulos_examenes_fij').val()        ;    // 11
        var insumos_comput_fij          = $('#insumos_comput_fij').val()          ;    // 12
        var materiales_fij              = $('#materiales_fij').val()              ;    // 13
        var fotocopias_fij              = $('#fotocopias_fij').val()              ;    // 14
        var promo_publi_fij             = $('#promo_publi_fij').val()             ;    // 15
        var titulacion_fij              = $('#titulacion_fij').val()              ;    // 16
        var valor_cafe_fij              = $('#valor_cafe_fij').val()              ;    // 17
        var viajes_fij                  = $('#viajes_fij').val()                  ;    // 18
        var movilizacion_fij            = $('#movilizacion_fij').val()            ;    // 19
        var arriendos_fij               = $('#arriendos_fij').val()               ;    // 20
        var porc_overhead_fij           = $('#porc_overhead_fij').val()           ;    // 21
        var otros_fij                   = $('#otros_fij').val()                   ;    // 22
        var costo_director_var          = $('#costo_director_var').val()          ;    // 23
        var cuotas_director_var         = $('#cuotas_director_var').val()         ;    // 24
        var rem_coordinacion_var        = $('#coordinacion_var').val()            ;    // 25
        var valor_hora_var              = $('#valor_hora_var').val()              ;    // 26
        var rem_honorarios_var          = $('#honorarios_var').val()              ;    // 27
        var rem_titulacion_var          = $('#titulos_examenes_var').val()        ;    // 28
        var insumos_comput_var          = $('#insumos_comput_var').val()          ;    // 29
        var materiales_var              = $('#materiales_var').val()              ;    // 30
        var fotocopias_var              = $('#fotocopias_var').val()              ;    // 31
        var promo_publi_var             = $('#promo_publi_var').val()             ;    // 32
        var titulacion_var              = $('#titulacion_var').val()              ;    // 33
        var valor_cafe_var              = $('#valor_cafe_var').val()              ;    // 34
        var viajes_var                  = $('#viajes_var').val()                  ;    // 35
        var movilizacion_var            = $('#movilizacion_var').val()            ;    // 36
        var arriendos_var               = $('#arriendos_var').val()               ;    // 37
        var porc_overhead_var           = $('#porc_overhead_var').val()           ;    // 38
        var otros_var                   = $('#otros_var').val()                   ;    // 39
        var horas_adicionales           = $('#horas_adicionales').val()           ;    // 40
        var cuotas_direccion_fij        = $('#cuotas_direccion_fij').val()        ;    // 41
        var cuotas_direccion_var        = $('#cuotas_direccion_var').val()        ;    // 42
        var otros_servicios_var         = $('#otros_servicios_var').val()         ;    // 43
        var otros_servicios_fij         = $('#otros_servicios_fij').val()         ;    // 44
        var serv_comput_var             = $('#serv_comput_var').val()             ;    // 46
        var serv_comput_fij             = $('#serv_comput_fij').val()             ;    // 45
        var ayudantias_var              = $('#ayudantias_var').val()              ;    // 48
        var ayudantias_fij              = $('#ayudantias_fij').val()              ;    // 47
        var plataforma_online_fij       = $('#plataforma_online_fij').val()       ;    // 49
        var plataforma_online_meses_fij = $('#plataforma_online_meses_fij').val() ;    // 51
        var plataforma_online_var       = $('#plataforma_online_var').val()       ;    // 50
        var plataforma_online_meses_var = $('#plataforma_online_meses_var').val() ;    // 52

        if ( tipo == 1 ) {
            horas_programa                = newValue;
            $('#horas_programa').val( horas_programa );   // 1
        }
        if ( tipo == 2 ) {
            horas_sin_tesis               = newValue; 
            $('#horas_sin_tesis').val(horas_sin_tesis); // 2
        }
        if ( tipo == 3 ) {
            horas_ahorro_articulacion     = newValue; 
            $('#horas_ahorro_articulacion').val(horas_ahorro_articulacion);  // 3
        }
        if ( tipo == 4 ) {
            porc_desercion                = newValue; 
            $('#porc_desercion').val(porc_desercion);   // 4
        }
        if ( tipo == 5 ) {
            porc_morosidad                = newValue; 
            $('#porc_morosidad').val(porc_morosidad);   // 5
        }
        if ( tipo == 6 ) {
            costo_director_fij            = newValue; 
            $('#costo_director_fij').val(costo_director_fij);   // 6
        }
        if ( tipo == 7 ) {
            cuotas_director_fij           = newValue; 
            $('#cuotas_director_fij').val(cuotas_director_fij);   // 7
        }
        if ( tipo == 8 ) {
            rem_coordinacion_fij          = newValue; 
            $('#coordinacion_fij').val(rem_coordinacion_fij);      // 8
        }
        if ( tipo == 9 ) {
            valor_hora_fij                = newValue; 
            $('#valor_hora_fij').val(valor_hora_fij);     // 9
        }
        if ( tipo == 10 ) {
            rem_honorarios_fij            = newValue; 
            $('#honorarios_fij').val(rem_honorarios_fij);     // 10
        }
        if ( tipo == 11 ) {
            rem_titulacion_fij            = newValue; 
            $('#titulos_examenes_fij').val(rem_titulacion_fij);    // 11
        }
        if ( tipo == 12 ) {
            insumos_comput_fij            = newValue; 
            $('#insumos_comput_fij').val(insumos_comput_fij);    // 12
        }
        if ( tipo == 13 ) {
            materiales_fij                = newValue; 
            $('#materiales_fij').val(materiales_fij);     // 13
        }
        if ( tipo == 14 ) {
            fotocopias_fij                = newValue; 
            $('#fotocopias_fij').val(fotocopias_fij);    // 14
        }
        if ( tipo == 15 ) {
            promo_publi_fij               = newValue; 
            $('#promo_publi_fij').val(promo_publi_fij);    // 15
        }
        if ( tipo == 16 ) {
            titulacion_fij                = newValue; 
            $('#titulacion_fij').val(titulacion_fij);    // 16
        }
        if ( tipo == 17 ) {
            valor_cafe_fij                = newValue; 
            $('#valor_cafe_fij').val(valor_cafe_fij);    // 17
        }
        if ( tipo == 18 ) {
            viajes_fij                    = newValue; 
            $('#viajes_fij').val(viajes_fij);    // 18
        }
        if ( tipo == 19 ) {
            movilizacion_fij              = newValue; 
            $('#movilizacion_fij').val(movilizacion_fij);    // 19
        }
        if ( tipo == 20 ) {
            arriendos_fij                 = newValue; 
            $('#arriendos_fij').val(arriendos_fij);    // 20
        }
        if ( tipo == 21 ) {
            porc_overhead_fij             = newValue; 
            $('#porc_overhead_fij').val(porc_overhead_fij);    // 21
        }
        if ( tipo == 22 ) {
            otros_fij                     = newValue; 
            $('#otros_fij').val(otros_fij);    // 22
        }
        if ( tipo == 23 ) {
            costo_director_var            = newValue; 
            $('#costo_director_var').val(costo_director_var);    // 23
        }
        if ( tipo == 24 ) {
            cuotas_director_var           = newValue; 
            $('#cuotas_director_var').val(cuotas_director_var);    // 24
        }
        if ( tipo == 25 ) {
            rem_coordinacion_var          = newValue; 
            $('#coordinacion_var').val(rem_coordinacion_var);    // 25
        }
        if ( tipo == 26 ) {
            valor_hora_var                = newValue; 
            $('#valor_hora_var').val(valor_hora_var);    // 26
        }
        if ( tipo == 27 ) {
            rem_honorarios_var            = newValue; 
            $('#honorarios_var').val(rem_honorarios_var);    // 27
        }
        if ( tipo == 28 ) {
            rem_titulacion_var            = newValue; 
            $('#titulos_examenes_var').val(rem_titulacion_var);    // 28
        }
        if ( tipo == 29 ) {
            insumos_comput_var            = newValue; 
            $('#insumos_comput_var').val(insumos_comput_var);    // 29
        }
        if ( tipo == 30 ) {
            materiales_var                = newValue; 
            $('#materiales_var').val(materiales_var);    // 30
        }
        if ( tipo == 31 ) {
            fotocopias_var                = newValue; 
            $('#fotocopias_var').val(fotocopias_var);    // 31
        }
        if ( tipo == 32 ) {
            promo_publi_var               = newValue; 
            $('#promo_publi_var').val(promo_publi_var);    // 32
        }
        if ( tipo == 33 ) {
            titulacion_var                = newValue; 
            $('#titulacion_var').val(titulacion_var);    // 33
        }
        if ( tipo == 34 ) {
            valor_cafe_var                = newValue; 
            $('#valor_cafe_var').val(valor_cafe_var);    // 34
        }
        if ( tipo == 35 ) {
            viajes_var                    = newValue; 
            $('#viajes_var').val(viajes_var);    // 35
        }
        if ( tipo == 36 ) {
            movilizacion_var              = newValue; 
            $('#movilizacion_var').val(movilizacion_var);    // 36
        }
        if ( tipo == 37 ) {
            arriendos_var                 = newValue; 
            $('#arriendos_var').val(arriendos_var);    // 37
        }
        if ( tipo == 38 ) {
            porc_overhead_var             = newValue; 
            $('#porc_overhead_var').val(porc_overhead_var);    // 38
        }
        if ( tipo == 39 ) {
            otros_var                     = newValue; 
            $('#otros_var').val(otros_var);    // 39
        }
        if ( tipo == 40 ) {
            horas_adicionales         = newValue; 
            $('#horas_adicionales').val(horas_adicionales);    // 40
        }
        if ( tipo == 41 ) {
            cuotas_coordinacion_fij           = newValue; 
            $('#cuotas_coordinacion_fij').val(cuotas_coordinacion_fij);    // 41
        }
        if ( tipo == 42 ) {
            cuotas_coordinacion_var           = newValue; 
            $('#cuotas_coordinacion_var').val(cuotas_coordinacion_var);    // 42
        }
        if ( tipo == 43 ) {
            otros_servicios_var           = newValue; 
            $('#otros_servicios_var').val(otros_servicios_var);    // 43
        }
        if ( tipo == 44 ) {
            otros_servicios_fij           = newValue; 
            $('#otros_servicios_fij').val(otros_servicios_fij);    // 44
        }

        if ( tipo == 45 ) {
            serv_comput_fij               = newValue; 
            $('#serv_comput_fij').val(serv_comput_fij);    // 45
        }
        if ( tipo == 46 ) {
            serv_comput_var               = newValue; 
            $('#serv_comput_var').val(serv_comput_var);    // 46
        }
        if ( tipo == 47 ) {
            ayudantias_fij                = newValue; 
            $('#ayudantias_fij').val(ayudantias_fij);    // 47
        }
        if ( tipo == 48 ) {
            ayudantias_var                = newValue; 
            $('#ayudantias_var').val(ayudantias_var);    // 48
        }
        if ( tipo == 49 ) {
            plataforma_online_fij                = newValue; 
            $('#plataforma_online_fij').val(plataforma_online_fij);    // 49
        }
        if ( tipo == 50 ) {
            plataforma_online_var                = newValue; 
            $('#plataforma_online_var').val(plataforma_online_var);    // 50
        }
        if ( tipo == 51 ) {
            plataforma_online_meses_fij          = newValue; 
            $('#plataforma_online_meses_fij').val(plataforma_online_meses_fij);    // 51
        }
        if ( tipo == 52 ) {
            plataforma_online_meses_var          = newValue; 
            $('#plataforma_online_meses_var').val(plataforma_online_meses_var);    // 52
        }


        /* Ingresos */
        var alumnos_for            = $('#alumnos').val();
        var arancel_eje            = $('#arancel').val();
        var matricula_eje          = $('#matricula').val();
        var descuento_mat          = $('#descuento').val(); 
        var cant_progs_articulados = 1;

/* */
        if ( ( arancel_eje + matricula_eje ) > 0 ) {
            var porc_descuento_eje = ( descuento_mat * 100 ) / ( arancel_eje + matricula_eje );
        } else {
            var porc_descuento_eje = 0;
        }

        var ingreso_bruto_for = ( parseInt( arancel_eje ) + parseInt( matricula_eje ) ); // viene de las matriculas
        var descuento_for     = descuento_mat;  // viene de las matriculas
        var ingreso_neto_for  = ingreso_bruto_for - descuento_for;
        var desercion_for     = ( parseFloat( porc_desercion ) * parseFloat( ingreso_neto_for ) ) / 100;
        var morosidad_for     = ( parseFloat( porc_morosidad ) * ingreso_neto_for ) / 100;

        var ingreso_neto_final_for = Math.round( ingreso_neto_for - desercion_for - morosidad_for );


        // Costos Variables Iniciales //
        var rem_direccion_for_var     = parseInt( costo_director_var ) * parseInt( cuotas_director_var )                  * parseInt( alumnos_for ); 
        var rem_coordinacion_for_var  = parseInt( rem_coordinacion_var )                                                  * parseInt( alumnos_for );
        var rem_docentes_for_var      = ( parseInt( horas_sin_tesis ) - parseInt( horas_ahorro_articulacion ) + parseInt( horas_adicionales ) ) * parseInt( valor_hora_var ) * cant_progs_articulados * parseInt( alumnos_for );
        //var rem_honorarios_for_var   = 0 * parseInt( rem_honorarios_var )                                                * parseInt( alumnos_for );
        var rem_honorarios_for_var    = 0;
        var rem_titulacion_for_var    = parseInt( rem_titulacion_var )                                                    * parseInt( alumnos_for );
        var insumos_comput_for_var    = parseInt( insumos_comput_var )                                                    * parseInt( alumnos_for );
        var materiales_for_var        = parseInt( materiales_var )                                                        * parseInt( alumnos_for );
        var fotocopias_for_var        = parseInt( fotocopias_var )                                                        * parseInt( alumnos_for );
        var promo_publi_for_var       = parseInt( promo_publi_var )                                                       * parseInt( alumnos_for );
        var titulacion_for_var        = parseInt( titulacion_var )                                                        * parseInt( alumnos_for );
        var casino_for_var            = ( ( parseInt( horas_programa ) / 4 ) ) * parseInt( valor_cafe_var )               * parseInt( alumnos_for );
        var viajes_for_var            = parseInt( viajes_var )                                                            * parseInt( alumnos_for );
        var movilizacion_for_var      = parseInt( movilizacion_var )                                                      * parseInt( alumnos_for );
        var arriendos_for_var         = parseInt( arriendos_var )                                                         * parseInt( alumnos_for );
        var otros_servicios_for_var   = parseInt( otros_servicios_var )                                                   * parseInt( alumnos_for );
        var otros_for_var             = parseInt( otros_var )                                                             * parseInt( alumnos_for );
        var serv_comput_for_var       = parseInt( serv_comput_var )                                                       * parseInt( alumnos_for );
        var ayudantias_for_var        = parseInt( ayudantias_var )                                                        * parseInt( alumnos_for );
        var plataforma_online_for_var = parseInt( plataforma_online_var ) * parseInt( plataforma_online_meses_var )       * parseInt( alumnos_for );
        var otros_for_var             = parseInt( otros_var )                                                             * parseInt( alumnos_for );
        var overhead_for_var          = ( parseFloat( porc_overhead_var ) * ingreso_bruto_for  ) / 100                                             ;

        var total_costos_for_var     = rem_direccion_for_var   + rem_coordinacion_for_var + rem_docentes_for_var   + 
                                       rem_honorarios_for_var  + rem_titulacion_for_var   + insumos_comput_for_var + 
                                       materiales_for_var      + fotocopias_for_var       + promo_publi_for_var    + 
                                       titulacion_for_var      + casino_for_var           + viajes_for_var         +  
                                       movilizacion_for_var    + arriendos_for_var        + otros_for_var          + 
                                       otros_servicios_for_var + overhead_for_var         + serv_comput_for_var    +
                                       ayudantias_for_var      + plataforma_online_for_var;
        

        // Costos Fijos Iniciales //
        var rem_direccion_for_fij     = parseInt( costo_director_fij ) * parseInt( cuotas_director_fij )                 ; 
        var rem_coordinacion_for_fij  = parseInt( rem_coordinacion_fij )                                                 ;
        var rem_docentes_for_fij      = ( parseInt( horas_sin_tesis ) - parseInt( horas_ahorro_articulacion ) + parseInt( horas_adicionales ) ) * parseInt( valor_hora_fij ) * cant_progs_articulados;
        //var rem_honorarios_for_fij   = 0 * parseInt( rem_honorarios_fij )                                                   ;
        var rem_honorarios_for_fij    = 0                                                   ;
        var rem_titulacion_for_fij    = parseInt( rem_titulacion_fij )                                                   ;
        var insumos_comput_for_fij    = parseInt( insumos_comput_fij )                                                   ;
        var materiales_for_fij        = parseInt( materiales_fij )                                                       ;
        var fotocopias_for_fij        = parseInt( fotocopias_fij )                                                       ;
        var promo_publi_for_fij       = parseInt( promo_publi_fij )                                                      ;
        var titulacion_for_fij        = parseInt( titulacion_fij )                                                       ;
        var casino_for_fij            = parseInt( valor_cafe_fij )                                                       ;
        var viajes_for_fij            = parseInt( viajes_fij )                                                           ;
        var movilizacion_for_fij      = parseInt( movilizacion_fij )                                                     ;
        var arriendos_for_fij         = parseInt( arriendos_fij )                                                        ;
        var otros_for_fij             = parseInt( otros_fij )                                                            ;
        var serv_comput_for_fij       = parseInt( serv_comput_fij )                                                      ;
        var ayudantias_fij            = parseInt( ayudantias_fij )                                                       ;
        var plataforma_online_for_fij = parseInt( plataforma_online_fij ) * parseInt( plataforma_online_meses_fij )      ;
        var otros_servicios_for_fij   = parseInt( otros_servicios_fij )                                                  ;
        var overhead_for_fij          = ( parseFloat( porc_overhead_fij ) * ingreso_bruto_for  ) / 100                   ;
        
        var total_costos_for_fij     = rem_direccion_for_fij   + rem_coordinacion_for_fij + rem_docentes_for_fij   + 
                                       rem_honorarios_for_fij  + rem_titulacion_for_fij   + insumos_comput_for_fij + 
                                       materiales_for_fij      + fotocopias_for_fij       + promo_publi_for_fij    + 
                                       titulacion_for_fij      + casino_for_fij           + viajes_for_fij         +  
                                       movilizacion_for_fij    + arriendos_for_fij        + otros_for_fij          + 
                                       otros_servicios_for_fij + overhead_for_fij         + serv_comput_for_fij    +
                                       ayudantias_fij          + plataforma_online_for_fij;

//$('#pto_equilibrio').val( total_costos_for_fij );

        if ( ( ingreso_neto_final_for - total_costos_for_var ) > 0 ) {
            var aux = ( ingreso_neto_final_for - total_costos_for_var ) / alumnos_for;
            var equi = Math.ceil( total_costos_for_fij / aux );
            $('#pto_equilibrio').val( equi );
            //var punto_equilibrio_for = ceil(   ( total_costos_for_fij ) / ( ( aux ) / alumnos_for ) );
        } else {
            $('#pto_equilibrio').val( 0 );
            var punto_equilibrio_for = 0;
        }

    }
})
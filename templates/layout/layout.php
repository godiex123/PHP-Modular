<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="SmartCampus - Manager">
    <meta name="author" content="SmartCampus">
    <link rel="icon" href="../../favicon.ico">
    <title>SmartCampus - Manager</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <!-- Estilos (de microcurricular)-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- <link rel="stylesheet" href="css/bootstrap.min.css">      -->
    <link href="assets/css/roboto-condensed.css" rel="stylesheet">
    <link href="assets/css/smartcampusv01.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Estilos Nuevos modulos  -->
    <link rel="stylesheet" href="assets/css/toastr.scss">
    <link rel="stylesheet" href="assets/css/registroAcademico.css">
    <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css" />
    <!-- WaitMe CSS -->
    <link type="text/css" rel="stylesheet" href="assets/css/waitMe.min.css">
    <!-- Time Picker -->
    <link href="assets/css/timepicker.css" rel="stylesheet" type="text/css">
    <link href="https://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- ********************************** -->
    <!-- CSS de Select2 -->
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
</head>
<body>
<nav class="navbar navbar-fixed-top ColorFondoGris">
    <div class="container-fluid TextoColorNegro">
        <div class="navbar-header"><a class="navbar-brand" href="<?= $home; ?>">
                <img src="assets/images/logoSmartCampus.svg" width="140px"></a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">

                <?php if($menus) {
                    foreach($menus as $menu) { ?>
                        <li>
                            <a href="#" data-toggle="dropdown" role="button" aria-haspopup="true"
                               aria-expanded="false"><?= $menu["nombre"]; ?> <span class="caret"></span></a>

                            <?php
                            # ROLES MULTIPLES - NUEVO
                            if ($roles[0]){
                                if($submenus = Actions::menu_multirol($menu["id_menu"], $roles)) { ?>
                                    <ul class="dropdown-menu">
                                        <?php $cant = count($submenus);
                                        $n = 1;
                                        foreach($submenus as $submenu) {
                                            if($submenu["icono"] == "subtitulo") {
                                                if($n == $cant) continue; ?>
                                                <li role="separator" class="divider"></li>
                                                <li class="dropdown-header"><?= $submenu["nombre"]; ?></li>
                                            <?php } else { ?>
                                                <li>
                                                    <a href="<?= $submenu["enlace"]; ?>"><span class="<?= $submenu["icono"]; ?>"
                                                                                               aria-hidden="true"></span> <?= $submenu["nombre"]; ?> </a>
                                                </li>
                                            <?php }
                                            $n++; } ?>
                                    </ul>
                                <?php }
                                # ROL ÚNICO - ANTIGUO
                            } elseif ($submenus = Actions::menu($menu["id_menu"], $rol)){ ?>
                                <ul class="dropdown-menu">
                                    <?php $cant = count($submenus);
                                    $n = 1;
                                    foreach($submenus as $submenu) {
                                        if($submenu["icono"] == "subtitulo") {
                                            if($n == $cant) continue; ?>
                                            <li role="separator" class="divider"></li>
                                            <li class="dropdown-header"><?= $submenu["nombre"]; ?></li>
                                        <?php } else { ?>
                                            <li>
                                                <a href="<?= $submenu["enlace"]; ?>"><span class="<?= $submenu["icono"]; ?>"
                                                                                           aria-hidden="true"></span> <?= $submenu["nombre"]; ?> </a>
                                            </li>
                                        <?php }
                                        $n++; } ?>
                                </ul>
                            <?php } ?>
                        </li>
                    <?php }
                } ?>
            </ul>

            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;
                        <?= /*$descripcion.": ".*/$nombre_usuario; ?> <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <!--<li><a href="cambiarClave.php"><span class="glyphicon glyphicon-cog"
                                    aria-hidden="true"></span> Cambiar contraseña</a></li>-->
                        <li style="padding-left: 10px; padding-right: 10px;">
                            <strong>Roles Activos:</strong>

                            <?php if (isset($roles[0])){
                                foreach($roles as $dd_rol){ ?>
                                    <br>&bull; <?= $dd_rol["rol_desc"]; ?>
                                <?php }} else { ?>
                                <br>&bull; <?= $descripcion ?>
                            <?php } ?>
                        </li>
                        <li role="separator" class="divider"></li>
                        <li><a href="<?= $_SESSION["logout"]; ?>">
                                <span class="glyphicon glyphicon-off" aria-hidden="true"></span>&nbsp;&nbsp;Cerrar Sesión</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

<section class="container-fluid contenedor-principal">
    <div class="row">
        <div class="col-md-10 col-md-offset-1 contenedor-tabla">
            <?= $content ?>
        </div>
    </div>
</section>


<!-- Javascript (de microcurricular)-->
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="jquery/3.3.1/jquery-3.3.1.min.js"></script>
<script src="assets/js/timepicker.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="//cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>
<script src="assets/js/toastr.js"></script>
<script src="assets/js/waitMe.min.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="<?= "assets/js/" . $asset_folder . JS_FILE . '?n=' . V; ?>"></script>
<?= Toastr::print(); ?>
<script src="https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js" defer></script>
<script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.html5.min.js" defer></script>
<script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.print.min.js" defer></script>
<!-- JS de jQuery y Select2 -->
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<footer>
    <hr>
    <small>&copy; <?= date('Y') ?></small>
</footer>
</body>
</html>
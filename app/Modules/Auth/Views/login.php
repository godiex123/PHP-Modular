
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Acá parte de la propuesta -->
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <!-- <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed" rel="stylesheet"> -->
    <link href="assets/css/roboto-condensed.css" rel="stylesheet">
    <link href="assets/css/smartcampusv01.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/toastr.scss">
    <title>SmartCampus - Manager </title>
    <style>
html, body { height: 100%!important; }
    </style>
</head>

<body>
    <div class="divContenedorLogin">
        <div class="divLoginCol01">
            <img src="assets/images/icoLogin.svg" alt="Login" class="icoCandado" />
            <img src="assets/images/logoSmartCampus.svg" alt="SmartCampus" class="imgLogotipo" />
            <h1 class="TituloH1">Manager</h1>
        </div>
        <div class="divLoginCol02">
            <form role="form" class="form-horizontal" action="/login" method="post">
                <span class="">
                    <label>Usuario</label>
                    <input type="text" id="usuario" name="user" class="form-control Input" placeholder="Usuario" required>
                </span>
                <span class="">
                    <label>Clave</label>
                    <input type="password" id="password" name="password" class="form-control col-xs-12 Input"
                        placeholder="Clave" required>
                </span>
                <span class="">
                    <input name="submit" type="submit" value="Aceptar" class="btn btn-info" />
                </span>
                <span class="">
                    <a href="forgot_password.php" class="btn btn-default" style="width:100%;">Recuperar clave</a>
                </span>
            </form>
            <?php if (!empty($error)): ?>
                <p style="color: red;"><?= htmlspecialchars($error) ?></p>
            <?php endif; ?>
        </div>

        <div class="divPiePagina">
Servicio entregado por SmartCampus para Universidad Central de Chile<br />
            <small>Todos los Derechos Reservados</small>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="assets/js/toastr.js"></script>
</body>

</html>
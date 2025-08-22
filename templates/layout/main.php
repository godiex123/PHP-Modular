<!-- views/layout/main.php -->
<?php include __DIR__ . '/header.php'; ?>
<?php include __DIR__ . '/topbar.php'; ?>
<?php include __DIR__ . '/sidebar.php'; ?>

<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">

                <?= $content ?? '' ?>

        <!-- container-fluid -->
        </div>
    <!-- End Page-content -->
    </div>

</div>

<?php include __DIR__ . '/footer.php'; ?>
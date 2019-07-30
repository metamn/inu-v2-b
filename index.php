<?php
  $TEMPLATE_PATH = parse_url(get_template_directory_uri(), PHP_URL_PATH);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<?php $BRC_TEMPLATE_PATH = parse_url(get_template_directory_uri(), PHP_URL_PATH); ?>
<script src='<?php echo $BRC_TEMPLATE_PATH; ?>/react-src/node_modules/@devloco/react-scripts-wptheme-utils/wpThemeClient.js'></script>
<script src='<?php echo $BRC_TEMPLATE_PATH; ?>/react-src/node_modules/@devloco/react-scripts-wptheme-error-overlay/wpThemeErrorOverlay.js'></script>

<script> wpThemeClient.start("ws", "127.0.0.1", "8090"); </script>

    <meta charset="utf-8">
    <link rel="shortcut icon" href="/react-wp/wp-content/themes/inu-v2-b/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="<?php echo $TEMPLATE_PATH; ?>/manifest.json">
    <title>React WordPress Theme</title>
</head>
    <body>
    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
    <script src="/react-wp/wp-content/themes/inu-v2-b/static/js/runtime~main.ad097248.js"></script><script src="/react-wp/wp-content/themes/inu-v2-b/static/js/0.b4301c9b.chunk.js"></script><script src="/react-wp/wp-content/themes/inu-v2-b/static/js/main.d1b44964.chunk.js"></script></body>
</html>

<!DOCTYPE html>
<html>
    <head>
        <title>Laravel 5 + Angular 2 Example</title>
        <link rel="stylesheet" href="/css/app.css">
        <base href="/"/>
        <!-- https://christianliebel.com/2016/03/fixing-angular-2-app-ie-9-11/ -->
        <!--[if IE]>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.35.1/es6-shim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.31/system-polyfills.js"></script>
        <script src="https://npmcdn.com/angular2@2.0.0-beta.6/es6/dev/src/testing/shims_for_IE.js"></script>
        <![endif]-->
    </head>
    <body>

        @yield('layout')

        @if (Config::get('app.debug'))
            <script type="text/javascript">
                document.write('<script src="//localhost:35729/livereload.js?snipver=1" type="text/javascript"><\/script>')
            </script>
        @endif
    </body>
</html>

<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Admin</title>
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <link
      rel="apple-touch-icon"
      sizes="76x76"
      href="%PUBLIC_URL%/apple-icon.png"
    />
    <!-- Fonts -->
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:400,700,300"
      rel="stylesheet"
      type="text/css"
    />
    <link rel="stylesheet" href="https://unpkg.com/react-rangeslider/umd/rangeslider.min.css" />
</head>
<body>
    <script src="https://code.jquery.com/jquery-3.0.0.min.js"></script>
    <script src="https://unpkg.com/react-rangeslider/umd/rangeslider.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/rangeslider.js/2.3.2/rangeslider.js"></script>
    <div id="root"></div>
    <script src="{{asset('js/index.js')}}"></script>
</body>
</html>
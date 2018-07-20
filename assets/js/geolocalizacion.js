$( document ).on( "pageinit", "#map-page",  function() {
    var defaultLatLng = new google.maps.LatLng(34.0937508, -118.3264781);  // Por defecto muestra Hollywwod, cuando no tiene acceso a la localizacion
    if ( navigator.geolocation ) { // si soporta geolocalizacion
        function success(pos) {
            // Localizacion encontrada, coordenadas del mapa
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        function fail(error) {
            drawMap(defaultLatLng);  // falla la localizacion, mapa por defecto
        }
        //encontrar la posicion actual de los usuarios.  Cache la localizacion por 5 minutos, despues de 6 segundos
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  //no soporta geolocalizacion
    }
    function drawMap(latlng) { // zoom de la ubicacion encontrada
        var myOptions = {  
            zoom: 15, 
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        //mostrar latitud y longitud en el mapa 
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
    }

});




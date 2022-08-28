
        // funcion de notificacion a traves de la libreria Toastify
       const notificaciones = (texto = 'Bienvenido', color = 'green', funcionClick = '') => {

            Toastify({
                text: texto,
                duration: 6000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                className: color,
                onClick: funcionClick // Callback after click
            }).showToast();
        }

        //Creamos la instancia
        const valores = window.location.search;
        const urlParams = new URLSearchParams(valores);

        //Accedemos a los valores
        let mensaje = urlParams.get('message');
        console.log(mensaje);
        if (mensaje !== null) {
            notificaciones(mensaje, 'red')
        }


        

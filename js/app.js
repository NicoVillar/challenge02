;(function(){
    'use strict'

    var palabras = [
        localStorage.getItem('storage'),
        'ALURA',
        'NINO',
        'AFINIDAD',
        'PROGRAMAR',
        'ORACLE',
        'YOUTUBE'

    ];

    // variable para almacenar la configuracion actual
    var juego = null;
    // para ver si ya se ha enviado alguna alerta
    var finalizado = false;

    var juego = {
        palabra: 'ALURA',
        estado: 7,
        adivinado: ['A', 'L'],
        errado: ['B', 'J', 'K', 'C']

    }

    var $html = {
        hombre: document.getElementById('hombre'),
        adivinado: document.querySelector('.adivinado'),
        errado: document.querySelector('.errado') 

    }
    
    function dibujar(juego){
        // actualizar imagen del hombre
        var $elem;
        $elem = $html.hombre
        
        var estado = juego.estado;
        if(estado === 8){
            estado = juego.previo;
        }
        $elem.src = './img/estados/0' + estado + '.png'

        // creamos las letras adivinadas
        var palabra = juego.palabra;
        var adivinado = juego.adivinado;

        $elem = $html.adivinado
        // borramos los elementos anteriores
        $elem.innerHTML = '';

        for(let letra of palabra){
            let $span = document.createElement('span');
            let $txt = document.createTextNode('')
            if(adivinado.indexOf(letra) >= 0){
                $txt.nodeValue = letra;
            }
            $span.setAttribute('class', 'letra adivinada')
            $span.appendChild($txt);
            $elem.appendChild($span);
        }

        // creamos las letra erradas
        var errado = juego.errado;
        $elem = $html.errado;
        // borramos los elementos anteriores
        $elem.innerHTML = ''

        for(let letra of errado){
            let $span = document.createElement('span');
            let $txt = document.createTextNode(letra);
            $span.setAttribute('class', 'letra errada');
            $span.appendChild($txt);
            $elem.appendChild($span);

        }
    }

    function adivinar(juego, letra){
        var estado = juego.estado;
        // perdido o ganado no hay que hacer nada
        if(estado ===  1 || estado === 8){
            return;
        }

        var adivinado = juego.adivinado;
        var errado = juego.errado;
        // si hemos adivinado o errado a la letra no hacemos nada
        if(adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0 ){
            return;
        }

        var palabra = juego.palabra
        // si es letra de la palabra
        if(palabra.indexOf(letra) >= 0){
            let ganado = true;
            // debemos ver si llegamos al estado ganado
            for(let l of palabra){
                if(adivinado.indexOf(l) < 0 && l != letra){
                    ganado = false;
                    juego.previo = juego.estado
                    // juego.previo = juego.estado
                    break;
                }
            }
            //  si ya se ha ganado, debemos indicarlo
            if(ganado){
                juego.estado = 8;
            }
            // agregamos la letra a la lista de letras adivinadas
            adivinado.push(letra);
        }else{
                // si no es letra de la palabra, acercamos al hombre un paso mas a la ahorca
            juego.estado--
                // agregamos la letra a la lista de letras erradas
            errado.push(letra);

        }
    }

    window.onkeypress = function adivinarLetra(e){
        var letra = e.key;
        letra = letra.toUpperCase();
        if(/[^A-ZÑ]/.test(letra)){
            return
        }
        adivinar(juego, letra);
        var estado = juego.estado;
        if(estado === 8 && !finalizado){
            setTimeout(alertaGanado, 500);
            finalizado = true;
        }
        else if(estado === 1 && !finalizado){
            let palabra = juego.palabra;
            let fn = alertaPerdido.bind(undefined, palabra);
            setTimeout(fn, 500);
            finalizado = true;
        }
        dibujar(juego);

    }

    window.nuevoJuego = function nuevoJuego(){
        var palabra = palabraAleatoria()
        juego = {}
        juego.palabra = palabra;
        juego.estado = 7;
        juego.adivinado = [];
        juego.errado = [];
        finalizado = false;
        dibujar(juego);
        // console.log(juego);

    }

    function palabraAleatoria(){
        var index = ~~(Math.random() * palabras.length);
        return palabras[index];
    }

    function alertaGanado(){
        alert('Felicidades, ganaste');
    }

    function alertaPerdido(palabra){
        alert('Lo siento, perdiste... la palabra era: ' + palabra);

    }

    nuevoJuego();
    

    // adivinar(juego, 'U')
    // adivinar(juego, 'R')

    // dibujar(juego);
    

}())
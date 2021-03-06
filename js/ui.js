class userInterface {

    construirSelect() {
        if (document.querySelector('#cb5').checked) {
            api.obtenerMonedasTop10()
                .then(monedas => {
                    const selecCrypto = document.querySelector('#criptomoneda');
                    this.limpiarSelecCrypto();
                    for (const [key, value] of Object.entries(monedas.monedas.Data)) {
                        const opcion = document.createElement('option');
                        opcion.value = value.CoinInfo.Name;
                        opcion.innerText = value.CoinInfo.FullName;
                        selecCrypto.appendChild(opcion);
                    }
                })
        } else {
            api.obtenerMonedasAll()
                .then(monedas => {
                    const selecCrypto = document.querySelector('#criptomoneda');
                    this.limpiarSelecCrypto();
                    for (const [key, value] of Object.entries(monedas.monedas.Data)) {
                        const opcion = document.createElement('option');
                        opcion.value = value.Symbol;
                        opcion.innerText = value.FullName;
                        selecCrypto.appendChild(opcion);
                    }
                })
        }
    }

    //Borra las opciones anteriores para colocar las nuevas
    limpiarSelecCrypto(){
        document.querySelector('#criptomoneda').innerHTML='';
    }

    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        const mensajes = document.querySelector('.mensajes');
        mensajes.appendChild(div);

        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    mostrarImagen(simbolo) {
        api.obtenerUrlLogo(simbolo)
            .then(dato => {
                const url = `https://www.cryptocompare.com${dato.urlImg}`;
                const divImg = document.getElementById('cryptoImg');
                divImg.src = url;
            })
    }

    mostrarResultado(respuesta, moneda, crypto) {
        const anterior = document.querySelector('#resultado div');
        if (anterior) {
            anterior.remove();
        }

        const datosResultado = respuesta[crypto][moneda];
        const actualizacion = new Date(datosResultado.LASTUPDATE * 1000).toLocaleDateString('es-ES');

        let templateHTML = `
            <div class="card resultCard">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado:</h2>
                    <p>El precio de 1 ${datosResultado.FROMSYMBOL} es de ${datosResultado.PRICE.toFixed(3)} ${datosResultado.TOSYMBOL} </p>
                    </br>
                    <p>Variación del último día: ${datosResultado.CHANGEPCTDAY.toFixed(2)}%</p>
                    </br>
                    <p>Última actualización: ${actualizacion}</p>
                </div>
            </div>
        `;

        document.querySelector('.contenido-spinner').style.display = 'block';
        setTimeout(function () {
            document.querySelector('.contenido-spinner').style.display = 'none';
            document.querySelector('#resultado').innerHTML = templateHTML;
        }, 1500)
    }
}
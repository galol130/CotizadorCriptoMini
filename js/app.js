const ui = new userInterface();
const api = new API('2a5d4deaff6a7749d9f8ce9bc99c85ec48147e15f64c683b378b8b842e597372');
ui.construirSelect();

const formulario = document.querySelector('#formulario')
const monedaSelect = document.querySelector('#moneda');
const toggleBtn = document.querySelector('#cb5');
const criptomonedaSelect = document.querySelector('#criptomoneda');


formulario.addEventListener('submit',function(e){
    e.preventDefault();
    
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    const criptomonedaSeleccionada = criptomonedaSelect.options[criptomonedaSelect.selectedIndex].value;
    
    if(monedaSeleccionada === '' || criptomonedaSeleccionada === ''){
        ui.mostrarMensaje('Ambos campos son obligatorios','alert bg-danger text-center');
    }
    else{
        api.obtenerCotizacion(monedaSeleccionada,criptomonedaSeleccionada)
            .then(datos=>{
                ui.mostrarResultado(datos.datos.RAW, monedaSeleccionada, criptomonedaSeleccionada);
            })
    }
    
})

//Cada vez que se selecciona una criptomoneda, se muestra su símbolo
criptomonedaSelect.addEventListener('change', function(){
    const cryptoImg = document.getElementById('cryptoImg');
    const criptomonedaSeleccionada = criptomonedaSelect.options[criptomonedaSelect.selectedIndex].value;
    ui.mostrarImagen(criptomonedaSeleccionada);
})

//Cada vez que se cambia el toggle, se modifica el desplegable de criptomonedas
toggleBtn.addEventListener('change', function(){
    ui.construirSelect();
})
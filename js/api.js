class API{
    constructor(apikey){
        this.apikey = apikey;
    }

    async obtenerMonedas(){
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`;
        const monedasAPI =  await fetch(url);
        const monedas = await monedasAPI.json();

        return {monedas}
    }

    async obtenerUrlLogo(simbolo){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${simbolo}&tsyms=BTC&api_key=${this.apikey}`;
        const monedaAPI = await fetch(url);
        const datos = await monedaAPI.json();
        const urlImg = datos.DISPLAY[simbolo].BTC.IMAGEURL;
        return {urlImg}
    }

    async obtenerCotizacion(moneda, crypto){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}&api_key=${this.apikey}`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        
        return {datos}
    }
}
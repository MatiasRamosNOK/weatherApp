// Agregar el contenido del input a la lista
var objecto;
$("input[type='text']").keypress(function(event){
    //filtrar para que sólo se active cuando aprietan Enter
    if(event.key == "Enter") {
      limpiarLI();
      if(losLIestanVacios()){
        var ciudad = $("input[type='text']").val();
        buscarCiudad(ciudad);
      }
    }
  });

function buscarCiudad(data){
  
  data = encodeURI(data);
  /*
  console.log(`api.openweathermap.org/data/2.5/weather?q=${data}&appid=d9ab9b02a878efc8e675b5f80a702ee9`);
  $.ajax({
    method: 'GET',
    url: `api.openweathermap.org/data/2.5/weather?q=${data}&appid=d9ab9b02a878efc8e675b5f80a702ee9`,
    success: function(info){
      console.log(info)
    }
  })
  */
 $.ajax({
  method: 'GET',
  url: `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=95176c8edea30e33338e0eaddd53a916&units=metric&lang=es`,
  success: function(info){
      mostrarInfo(info);
  },
  error: function() {
    alert("No se ha encontrado la ciudad");
    limpiarCajaDeTexto();
  }
})
}

function losLIestanVacios(){
  var listaDeInfo = $("li");
  return (listaDeInfo[0].textContent == "")
}

function limpiarCajaDeTexto(){
  $("input")[0].value = "";
  $("li").css("display","none");
}

function limpiarLI(){
  var listaDeInfo = $("li");
  for(var i = 0 ;i<listaDeInfo.length;i++){
    listaDeInfo[i].textContent = ""
  }
}

function mostrarInfo(info){
  var tempActual = info.main.temp;
  var maxTemp = info.main.temp_max;
  var minTemp = info.main.temp_min;
  var actualCond = info.weather[0].description;
  var velViento = info.wind.speed;
  console.log(tempActual);
  //Habilito el container
  $("#container").css("display","inline");
  //Empiezo a setear los valores
  $("#actualTemp").append("Temperatura actual: "+ tempActual);
  $("#maxTemp").append("Temperatura maxima: "+ maxTemp);
  $("#minTemp").append("Temperatura minima: " + minTemp);
  $("#actualCond").append("Condiciones actuales: " + actualCond);
  $("#velViento").append("Velocidad del viento: "+ velViento);
}

$(".fa-arrows-alt-v").click(function(){
  $("input").slideToggle();
  $("li").slideToggle();
})

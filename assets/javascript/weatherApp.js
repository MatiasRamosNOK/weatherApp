// Agregar el contenido del input a la lista
var objecto;
$("input[type='text']").keypress(function(event){
    //filtrar para que sólo se active cuando aprietan Enter
    if(event.key == "Enter") {
      ocultarLI();
      $("#imgGato").css("display","block");
      limpiarLI();
      $("li").css("display","block");
        var ciudad = $("input[type='text']").val();
        buscarCiudad(ciudad);

    }
  });

function ocultarLI(){
  $("#container").css("display","none");
}

function mostrarLI(){
  $("li").css("display","block");
}

function buscarCiudad(data){
  
  data = encodeURI(data);
 $.ajax({
  method: 'GET',
  url: `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=95176c8edea30e33338e0eaddd53a916&units=metric&lang=es`,
  success: function(info){
      $("#imgGato").css("display","none");
      mostrarInfo(info);
  },
  error: function() {
    alert("No se ha encontrado la ciudad");
    limpiarCajaDeTexto();
    $("#imgGato").css("display","none");
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
  mostrarLI();
}

$(".fa-arrows-alt-v").click(function(){
  $("input").slideToggle();
  $("li").slideToggle();
})

var nombre = "David";
var altura = 150;


mostrarNombre(nombre, altura);


function mostrarNombre(nombre, altura){
  var d =  document.getElementById("datos");
  d.innerHTML = `
  <h1>Caja de datos</h1>
  <p>
  Hola mi nombre es ${nombre}<br>
  Mido ${altura}
  </p>
  `;
  if(altura > 180){
    d.innerHTML = `
    <hr>
    <span>Soy una persona <strong>Alta</strong></span>
    `;
  }else
  {
    d.innerHTML = `
    <hr>
    <span>Soy una persona <strong>Baja</strong></span>
    `;
  }
}

var coche = {
  modelo: "Mercedes Clase A",
  maxima: 500,
  antiguedad: 2020,
  mostrarDatos(){
    console.log(this.modelo, this.maxima, this.antiguedad);
  },
  propiedad: "valor"
}

document.write("<h1>"+coche.antiguedad+"</h1>");
coche.mostrarDatos();

var saludar = new Promise((resolve, reject) =>{
  setTimeout(() => {
    let saludo = "Hola buenas tardes";
    saludo = false;
    if(saludo){
      resolve(saludo);
    }
    else{
      reject("No hay saludos")
    }
  }, 2000);
  
});

saludar.then(resultado => {
  alert(resultado);
})
.catch(err => {
  alert(err);
});
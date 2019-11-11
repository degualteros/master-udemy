class Coche{
  constructor(modelo, velocidad, antiguedad){
    this.modelo = modelo;
    this.velocidad = velocidad;
    this.antiguedad = antiguedad;
  }
  aumentarVelocidad(){
    this.velocidad ++;
  }
  reducirVelocidad(){
    this.velocidad --;
  }
  
}

class Autobus extends Coche {
  constructor(modelo, velocidad, antiguedad){
    super(modelo, velocidad, antiguedad)
    this.altura = 5;
  }

  mostrarAltura(){
    return "la altura del bus es " + this.altura;
  }
}

var coche1 = new Coche("BMW", 200, 2017);
var coche2 = new Coche("Audi", 124, 1995);
var coche3 = new Coche("Renault", 215, 2019);

document.write("<h1>" + coche1.velocidad + "</h1>");
coche1.aumentarVelocidad();
document.write("<h1>" + coche1.velocidad + "</h1>");

var bus = new Autobus("BMW", 200, 2017);
console.log(bus.mostrarAltura());

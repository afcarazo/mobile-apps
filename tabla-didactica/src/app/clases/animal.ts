export class Animal {
    pathFoto:string;
    pathSonidoEspañol:string;
    pathSonidoIngles:string;
    pathSonidoPortugues:string;
    nombre: string;
    constructor( nombre: string,pathFoto:string, pathSonidoEspañol:string, pathSonidoIngles:string,pathSonidoPortugues:string)
    {
        this.pathFoto = pathFoto;
        this.pathSonidoEspañol = pathSonidoEspañol;
        this.pathSonidoIngles = pathSonidoIngles;
        this.pathSonidoPortugues = pathSonidoPortugues;
        this.nombre = nombre;
     }
    public static listadoAnimal: any[] = [
        new Animal('oso', 'assets/animales/oso.png', 'assets/animalesSonidos/osoPolarEspañol.mp3',
        'assets/animalesSonidos/osoPolarIngles.mp3','assets/animalesSonidos/osoPolarPortugues.mp3')
        ,
        new Animal('gato','assets/animales/gato.png', 'assets/animalesSonidos/gatoEspañol.mp3',
        'assets/animalesSonidos/gatoIngles.mp3','assets/animalesSonidos/gatoPortugues.mp3'),
        new Animal('vaca', 'assets/animales/vaca.png', 'assets/animalesSonidos/vacaEspañol.mp3',
        'assets/animalesSonidos/vacaIngles.mp3','assets/animalesSonidos/vacaPortugues.mp3'),
        new Animal('perro', 'assets/animales/perro.png', 'assets/animalesSonidos/perroEspañol.mp3',
        'assets/animalesSonidos/perroIngles.mp3','assets/animalesSonidos/perroPortugues.mp3'),
        new Animal('leon', 'assets/animales/leon.png', 'assets/animalesSonidos/leonEspañol.mp3',
        'assets/animalesSonidos/leonIngles.mp3','assets/animalesSonidos/leonPortugues.mp3'),
        new Animal('pinguino', 'assets/animales/pinguino.png', 'assets/animalesSonidos/pinguinoEspañol.mp3',
        'assets/animalesSonidos/pinguinoIngles.mp3','assets/animalesSonidos/pinguinoPortugues.mp3'),
      ]
}

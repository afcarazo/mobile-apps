export class Color {
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
    public static listadoColor: any[] = [
        new Color('verde', 'assets/colores/verde.png', 'assets/coloresSonidos/verdeEspañol.mp3',
        'assets/coloresSonidos/verdeIngles.mp3','assets/coloresSonidos/verdePortugues.mp3')
        ,
        new Color('amarillo','assets/colores/amarillo.png', 'assets/coloresSonidos/amarilloEspañol.mp3',
        'assets/coloresSonidos/amarilloIngles.mp3','assets/coloresSonidos/amarilloPortugues.mp3'),
        new Color('violeta', 'assets/colores/violeta.png', 'assets/coloresSonidos/violetaEspañol.mp3',
        'assets/coloresSonidos/violetaIngles.mp3','assets/coloresSonidos/violetaPortugues.mp3'),
        new Color('azul', 'assets/colores/azul.png', 'assets/coloresSonidos/azulEspañol.mp3',
        'assets/coloresSonidos/azulIngles.mp3','assets/coloresSonidos/azulPortugues.mp3'),
        new Color('rojo', 'assets/colores/rojo.png', 'assets/coloresSonidos/rojoEspañol.mp3',
        'assets/coloresSonidos/rojoIngles.mp3','assets/coloresSonidos/rojoPortugues.mp3'),
        new Color('rosa', 'assets/colores/rosa.png', 'assets/coloresSonidos/rosaEspañol.mp3',
        'assets/coloresSonidos/rosaIngles.mp3','assets/coloresSonidos/rosaPortugues.mp3'),
       
      ]
}

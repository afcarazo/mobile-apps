export class Numero {
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
    public static listadoNumero: any[] = [
        new Numero('uno', 'assets/numeros/uno.png', 'assets/numerosSonidos/unoEspañol.mp3',
        'assets/numerosSonidos/unoIngles.mp3','assets/numerosSonidos/unoPortugues.mp3')
        ,
        new Numero('dos','assets/numeros/dos.png', 'assets/numerosSonidos/dosEspañol.mp3',
        'assets/numerosSonidos/dosIngles.mp3','assets/numerosSonidos/dosPortugues.mp3'),
        new Numero('tres', 'assets/numeros/tres.png', 'assets/numerosSonidos/tresEspañol.mp3',
        'assets/numerosSonidos/tresIngles.mp3','assets/numerosSonidos/tresPortugues.mp3'),
        new Numero('cuatro', 'assets/numeros/cuatro.png', 'assets/numerosSonidos/cuatroEspañol.mp3',
        'assets/numerosSonidos/cuatroIngles.mp3','assets/numerosSonidos/cuatroPortugues.mp3'),
        new Numero('cinco', 'assets/numeros/cinco.png', 'assets/numerosSonidos/cincoEspañol.mp3',
        'assets/numerosSonidos/cincoIngles.mp3','assets/numerosSonidos/cincoPortugues.mp3'),
        new Numero('seis', 'assets/numeros/seis.png', 'assets/numerosSonidos/seisEspañol.mp3',
        'assets/numerosSonidos/seisIngles.mp3','assets/numerosSonidos/seisPortugues.mp3'),
      ]
}

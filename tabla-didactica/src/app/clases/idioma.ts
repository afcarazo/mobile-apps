import { Animal } from "./animal";
import { Boton } from "./boton";
import { Color } from "./color";
import { Numero } from "./numero";


export enum EnumTipoJuego { otro,animales,numero,color }
export enum EnumTipoIdioma{ portugues, español, ingles }

export class Idioma {
    listaBotones: Boton[];
    listaAnimal:any[];
    listaNumero:any[];
    listaColor: any[];
    
    public pathIconoIdioma:string;
    public pathIconoJuego:string;
    public tipoJuego:any;
    public idiomaActual:EnumTipoIdioma;   

    constructor() {
       
        this.tipoJuego=EnumTipoJuego.color;
        this.idiomaActual=EnumTipoIdioma.español;
        this.pathIconoIdioma="assets/banderas/españa.svg";
        this.pathIconoJuego="assets/tematicas/color.svg";

         this.listaNumero = Numero.listadoNumero;        
        this.listaAnimal = Animal.listadoAnimal;
         this.listaColor = Color.listadoColor;
         
        this.listaBotones=[];
        this.listaBotones.push(new Boton());
        this.listaBotones.push(new Boton());
        this.listaBotones.push(new Boton());
        this.listaBotones.push(new Boton());
        this.listaBotones.push(new Boton());
        this.listaBotones.push(new Boton());
        this.idiomaEspañol();
     }
     public idiomaEspañol()
     {
          this.idiomaActual = EnumTipoIdioma.español;
            this.pathIconoIdioma="assets/banderas/españa.svg";
     
            let i=0;
  
            switch (this.tipoJuego) {
                 case EnumTipoJuego.color:
  
                      for(i=0;i<this.listaBotones.length;i++)
                      {
                           this.listaBotones[i].pathFoto=this.listaColor[i].pathFoto;
                           this.listaBotones[i].pathSonido=this.listaColor[i].pathSonidoEspañol;
                      }
            
                      break;
                 case EnumTipoJuego.numero:
  
                      for(i=0;i<this.listaBotones.length;i++)
                      {
                           this.listaBotones[i].pathFoto=this.listaNumero[i].pathFoto;
                           this.listaBotones[i].pathSonido=this.listaNumero[i].pathSonidoEspañol;
                      }
            
                      break;
              
             
                 case EnumTipoJuego.animales:
                      
                      for(i=0;i<this.listaBotones.length;i++)
                      {
                           this.listaBotones[i].pathFoto=this.listaAnimal[i].pathFoto;
                           this.listaBotones[i].pathSonido=this.listaAnimal[i].pathSonidoEspañol;
                      }
                      
                      break;
                      
                 }
            this.CambiarIconoTematica();
     }
     public idiomaIngles()
     {
            this.pathIconoIdioma="assets/banderas/estados-unidos.svg";
            this.idiomaActual=EnumTipoIdioma.ingles;
            let i=0;
  
            switch (this.tipoJuego) {
                 case EnumTipoJuego.color:
  
                      for(i=0;i<this.listaBotones.length;i++)
                      {
                           this.listaBotones[i].pathFoto=this.listaColor[i].pathFoto;
                           this.listaBotones[i].pathSonido=this.listaColor[i].pathSonidoIngles;
                      }
            
                      break;
                
                 case EnumTipoJuego.numero:
  
                      for(i=0;i<this.listaBotones.length;i++)
                      {
                           this.listaBotones[i].pathFoto=this.listaNumero[i].pathFoto;
                           this.listaBotones[i].pathSonido=this.listaNumero[i].pathSonidoIngles;
                      }
            
                      break;
                
            
                 case EnumTipoJuego.animales:
                      
                      for(i=0;i<this.listaBotones.length;i++)
                      {
                           this.listaBotones[i].pathFoto=this.listaAnimal[i].pathFoto;
                           this.listaBotones[i].pathSonido=this.listaAnimal[i].pathSonidoIngles;
                      }
                      
                      break;
                      
                 }
            this.CambiarIconoTematica();
     }
     public idiomaPortugues()
     {
            this.pathIconoIdioma="assets/banderas/brasil.svg";
            this.idiomaActual=EnumTipoIdioma.portugues;
            let i=0;
  
            switch (this.tipoJuego) {
                 case EnumTipoJuego.color:
  
                      for(i=0;i<this.listaBotones.length;i++)
                      {
                           this.listaBotones[i].pathFoto=this.listaColor[i].pathFoto;
                           this.listaBotones[i].pathSonido=this.listaColor[i].pathSonidoPortugues;
                      }
            
                      break;
              
                 case EnumTipoJuego.numero:
  
                      for(i=0;i<this.listaBotones.length;i++)
                      {
                           this.listaBotones[i].pathFoto=this.listaNumero[i].pathFoto;
                           this.listaBotones[i].pathSonido=this.listaNumero[i].pathSonidoPortugues;
                      }
            
                      break;
              
    
              
    
                 case EnumTipoJuego.animales:
                      
                      for(i=0;i<this.listaBotones.length;i++)
                      {
                           this.listaBotones[i].pathFoto=this.listaAnimal[i].pathFoto;
                           this.listaBotones[i].pathSonido=this.listaAnimal[i].pathSonidoPortugues;
                      }
                      
                      break;
                      
                 }
            this.CambiarIconoTematica();
     }
     private CambiarIconoTematica()
     {
          switch (this.tipoJuego) {
               case EnumTipoJuego.color:                                          
                      this.pathIconoJuego="assets/tematicas/colores.svg";
                    break;
           
               case EnumTipoJuego.numero:                                          
                      this.pathIconoJuego="assets/tematicas/numeros.svg";
                    break;
             
              case EnumTipoJuego.animales: 
  
                      this.pathIconoJuego="assets/tematicas/animal.svg";
                    break;
  
          }
     }
  

    
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore) { }

  guardarFoto(cosa: any, tema:number)
  { 
    if (tema === 1) {
      this.angularFirestore.collection<any>('cosas-lindas').add(cosa).then((res) => res.id);
    }
    else if(tema ===2)
    {
      this.angularFirestore.collection<any>('cosas-feas').add(cosa).then((res) => res.id); 
    }
    }

  traerListaCosasLindas() {
    return this.angularFirestore.collection<any>('cosas-lindas', ref => ref.orderBy('hora', 'desc')).snapshotChanges();
  }
  traerListaCosasFeas() {
    return this.angularFirestore.collection<any>('cosas-feas',ref => ref.orderBy('hora', 'desc')).snapshotChanges();
  }

  modificarFoto(id:string,foto:any, tema:number) { 
    if (tema === 1) {
      return this.angularFirestore.collection<any>('cosas-lindas').doc(id).update(foto);
    }
    else if (tema === 2)
    {
      return this.angularFirestore.collection<any>('cosas-feas').doc(id).update(foto);
     }
  }


}

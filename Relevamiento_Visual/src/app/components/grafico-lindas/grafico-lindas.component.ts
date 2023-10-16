import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { map } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-grafico-lindas',
  templateUrl: './grafico-lindas.component.html',
  styleUrls: ['./grafico-lindas.component.scss'],
})
export class GraficoLindasComponent implements AfterViewInit, OnInit {
  public listadoCosasLindas:any[]=[];
  public labels:string[] =[];
  public votos:number[] =[];
  public images:string[] =[];
  public selectedNiceImage;

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor(private firestore: FirestoreService, private loadingController: LoadingController){
   
   }
  async ngOnInit() 
  {

    this.cargarFotosLindas();
   
  }
  async cargarFotosLindas() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.firestore.traerListaCosasLindas().subscribe(async cosasLindas => { 
        this.listadoCosasLindas = [];
        if (cosasLindas != null && cosasLindas.length > 0) {
          cosasLindas.forEach(async (element: any) => {
            this.listadoCosasLindas.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            });
          });
        }
      this.generarDatos();
      this.doughnutChartMethod();
      await loading.dismiss();
      })
    
  }

  async ngAfterViewInit() {
    
   
  }
  generarDatos() {
    let tempLabels = [];
    let tempFechas = [];
    for (let index = 0; index < this.listadoCosasLindas.length; index++) {
        tempLabels = this.listadoCosasLindas[index].email.split('@');
        tempFechas = this.listadoCosasLindas[index].hora.split(' ');
        this.labels.push(tempLabels[0] + ' | ' + tempFechas[0] + '/' + tempFechas[1]);

        this.votos.push(this.listadoCosasLindas[index].likes.length);
        this.images.push(this.listadoCosasLindas[index].pathFoto);
    }
}


  doughnutChartMethod() {
  
   

    this.selectedNiceImage = '';
    
    this.listadoCosasLindas.sort((a,b) => (a.likes > b.likes) ? -1 : (b.likes> a.likes) ? 1:0);

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [{
          label: '# of Votes',
          data: this.votos,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }],
       
      },
      options: {
        responsive: true,
       
        onClick: (e) => {
          const activePoints = this.doughnutChart.getElementsAtEvent(e);
          if (activePoints.length > 0) {
            
            var clickedElementindex = activePoints[0]["_index"];
            var label = this.doughnutChart.data.labels[clickedElementindex];
            this.selectedNiceImage = this.images[clickedElementindex];
          }
        }
      }
    });
  }



}
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { map } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-grafico-feas',
  templateUrl: './grafico-feas.component.html',
  styleUrls: ['./grafico-feas.component.scss'],
})
export class GraficoFeasComponent implements AfterViewInit, OnInit {
  public listadoCosasFeas:any=new Array<any>();
  public labels:any =[];
  public votos:any =[];
  public images:any =[];
  public selectedNiceImage;


  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor(private firestore: FirestoreService, private loadingController: LoadingController)
  {
    
  
   }
  async ngOnInit() 
  {
    this.cargarFotosFeas();
  }
  async cargarFotosFeas(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.firestore.traerListaCosasFeas().subscribe(async cosasFeas => { 
     
        this.listadoCosasFeas = [];
        if (cosasFeas != null && cosasFeas.length > 0) {
          cosasFeas.forEach(async (element: any) => {
            this.listadoCosasFeas.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            });
            console.log(this.listadoCosasFeas);
          })
        }
      this.generarDatos();
      this.barChartMethod();
      await loading.dismiss();
    })

   
  }
  
  ngAfterViewInit() {
    
  }

  generarDatos() {
    let tempLabels = [];
    let tempFechas = [];
    for (let index = 0; index < this.listadoCosasFeas.length; index++) {
        tempLabels = this.listadoCosasFeas[index].email.split('@');
        tempFechas = this.listadoCosasFeas[index].hora.split(' ');
        this.labels.push(tempLabels[0] + ' | ' + tempFechas[0] + '/' + tempFechas[1]);
        this.votos.push(this.listadoCosasFeas[index].likes.length);
        this.images.push(this.listadoCosasFeas[index].pathFoto);
    }

}
  barChartMethod() {
    Chart.defaults.global.legend.display = false;
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Votos',
          data: this.votos,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        onClick: (e) => {
          const activePoints = this.barChart.getElementsAtEvent(e);
          if (activePoints.length > 0) {

            var clickedElementindex = activePoints[0]["_index"];


            var label = this.barChart.data.labels[clickedElementindex];

            this.selectedNiceImage = this.images[clickedElementindex];
          }
        }
      }
    });
  }


}

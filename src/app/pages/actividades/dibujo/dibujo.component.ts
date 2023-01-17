import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsService } from '../../../services/charts.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dibujo',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dibujo.component.html',
  styleUrls: ['./dibujo.component.scss']
})
export class DibujoComponent implements OnInit {
  dibujos!: any[];

  constructor(
    private chartService: ChartsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getActividades();
  }

  arrayBufferToBase64( buffer: Iterable<number> ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  getActividades() {
    this.chartService.get('/charts/dibujoimagen').subscribe((dibujos) => {
      this.dibujos = dibujos.map(dibujo => {
        return {base64: this.arrayBufferToBase64(dibujo.imagen.data), nombre: dibujo.nombres}
      })
      console.log(this.dibujos);
    });
  }
}

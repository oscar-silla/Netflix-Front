import { Component, OnInit } from '@angular/core';
import { ElementService } from 'src/app/services/element.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {

  firstElements: Element[];
  secondElements: Element[];
  thirdElements: Element[];

  constructor(private elementService: ElementService) { }

  ngOnInit(): void {
    this.elementService.getAllElements().subscribe(res => {
      this.firstElements = res['data'].slice(0, 6).reverse();
      this.secondElements = res['data'].slice(6, 12).reverse();
      this.thirdElements = res['data'].slice(12, 18).reverse();
    });
  }

  toSection1() {
    document.getElementById('section1Trends').scrollIntoView({ behavior: 'smooth' });
  }

  toSection2() {
    document.getElementById('section2Trends').scrollIntoView({ behavior: 'smooth' });
  }

  toSection3() {
    document.getElementById('section3Trends').scrollIntoView({ behavior: 'smooth' });
  }

}

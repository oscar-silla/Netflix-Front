import { Component, OnInit } from '@angular/core';
import { ElementService } from 'src/app/services/element.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  firstElements: Element[];
  secondElements: Element[];
  thirdElements: Element[];

  constructor(private elementService: ElementService) { }

  ngOnInit(): void {
    this.elementService.getAllElements().subscribe(res => {
      this.firstElements = res['data'].slice(0,6);
      this.secondElements = res['data'].slice(6,12);
      this.thirdElements = res['data'].slice(12,18);
      console.log(this.firstElements)
    });
  }

  toSection1() {
    document.getElementById('section1').scrollIntoView({behavior: 'smooth'});
  }

  toSection2() {
    document.getElementById('section2').scrollIntoView({behavior: 'smooth'});
  }

  toSection3() {
    document.getElementById('section3').scrollIntoView({behavior: 'smooth'});
  }

}

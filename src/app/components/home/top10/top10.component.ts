import { Component, OnInit } from '@angular/core';
import { ElementService } from 'src/app/services/element.service';

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.scss']
})
export class Top10Component implements OnInit {

  firstElements: Element[];
  secondElements: Element[];
  thirdElements: Element[];

  constructor(private elementService: ElementService) { }

  ngOnInit(): void {
    this.elementService.getAllElements().subscribe(res => {
      let Top10 = res['data'].filter(element => {
        if (element.category.toLowerCase().includes('top10') == true) {
          return element;
        }
      });
      this.firstElements = Top10.slice(0,5);
      this.secondElements = Top10.slice(5, 10);
      
    });
  }

  toSection1() {
    document.getElementById('section1Top10').scrollIntoView({ behavior: 'smooth' });
  }

  toSection2() {
    document.getElementById('section2Top10').scrollIntoView({ behavior: 'smooth' });
  }

  toSection3() {
    document.getElementById('section3Top10').scrollIntoView({ behavior: 'smooth' });
  }

}

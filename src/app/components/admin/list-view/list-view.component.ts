import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { ElementService } from 'src/app/services/element.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  @Input()
  created: boolean; // Father to son

  @Output()
  created_changed = new EventEmitter(); // Son to father

  // Search List
  searchForm: FormGroup;
  elementsFound: Element[] = [];
  title: string = '';

  // All List
  elements: Element[];
  currentpage: number = 1


  constructor(private elementService: ElementService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      'title': ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.elementService.getAllElements().subscribe(res => {
      this.elements = res['data'];
    });
  }

  // Comunication between components
  ngOnChanges(changes: SimpleChanges) {
    let created = changes.created['currentValue'];
    if (created == true) {
      this.elementService.getAllElements().subscribe(res => {
        this.elements = res['data'];
        this.created_changed.emit(false);
      });
    }
  }

  // Search By Title
  search(value) {
    const title = value['title'].toLowerCase();
    this.title = title;
    this.elementsFound = this.elements.filter(element => element['title'].toLowerCase().includes(title));
  }

}

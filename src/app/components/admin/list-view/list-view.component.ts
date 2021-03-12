import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { ElementService } from 'src/app/services/element.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  id_element: string;

  received_id: boolean;

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
  currentpage: number = 1;


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

  // Get and send ID_ELEMENT
  showId(id: string) {
    this.id_element = id;
  }

  // Receive msg to update (Update all list)
  receive(e) {
    if (e) {
      this.elementService.getAllElements().subscribe(res => {
        this.elements = res['data'];
      });
    }
  }

  // Receive msg to update (Update Search list)
  receiveSearch(e) {
    this.received_id = e;
    if (e) {
      this.elementService.getAllElements().subscribe(res => {
        this.elementsFound = res['data'].filter(element => element['_id'].toLowerCase().includes(this.id_element));
        this.elements = res['data'];
      });
    }
  }

  // DELETE
  deleteElement(id) {
    this.elementService.deleteElement(id).subscribe(res => {
      this.elementService.getAllElements().subscribe(res => {
        this.elements = res['data'];
      });
    })
  }

  deleteElementSearch(id) {
    this.elementService.deleteElement(id).subscribe(res => {
      this.elementService.getAllElements().subscribe(res => {
        this.elementsFound = res['data'].filter(element => element['_id'].toLowerCase().includes(this.id_element));
        this.elements = res['data'];
      });
    });
  }

}

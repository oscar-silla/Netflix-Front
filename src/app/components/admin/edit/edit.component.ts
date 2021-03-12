import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementService } from 'src/app/services/element.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class EditComponent implements OnInit {

  @Input() id_element: string;

  @Output() updated = new EventEmitter();

  editForm: FormGroup
  validated: boolean = false;
  verifyButton:boolean = false;
  isUpdated: boolean = false;

  errors: string[] = [];
  err_type: boolean = false;
  err_title: boolean = false;
  err_description: boolean = false;
  err_category: boolean = false;
  err_actors: boolean = false;
  err_mp4: boolean = false;
  err_likes: boolean = false;
  err_poster: boolean = false;

  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private elementService: ElementService) {
    config.backdrop = 'static';
    config.keyboard = false;
    // Validator
    this.editForm = this.formBuilder.group({
      type: ['Pelicula', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      actors: ['', Validators.required],
      mp4: ['', Validators.required],
      likes: ['', Validators.required],
      poster: ['', Validators.required]
    });
  }

  // Open Modal
  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
  }

  // Validate fields for warning alerts
  validateFields() {
    if (this.errors.includes('type')) {
      this.err_type = true;
    }
    if (this.errors.includes('title')) {
      this.err_title = true;
    }
    if (this.errors.includes('description')) {
      this.err_description = true;
    }
    if (this.errors.includes('category')) {
      this.err_category = true;
    }
    if (this.errors.includes('actors')) {
      this.err_actors = true;
    }
    if (this.errors.includes('mp4')) {
      this.err_mp4 = true;
    }
    if (this.errors.includes('likes')) {
      this.err_likes = true;
    }
    if (this.errors.includes('poster')) {
      this.err_poster = true;
    }
  }

  // Clean warning alerts
  clean() {
    this.err_type = false;
    this.err_title = false;
    this.err_description = false;
    this.err_category = false;
    this.err_actors = false;
    this.err_mp4 = false;
    this.err_likes = false;
    this.err_poster = false;
  }

  // Verify and Validations
  verify(value) {
    this.clean();
    this.errors = [];
    console.log(this.errors)
    // Validations
    if (value.type === '') this.errors.push('type');
    if (value.title === '') this.errors.push('title');
    if (value.description === '') this.errors.push('description');
    if (value.category === '') this.errors.push('category');
    if (value.actors === '') this.errors.push('actors');
    if (value.mp4 === '') this.errors.push('mp4');
    if (value.likes === '') this.errors.push('likes');
    if (value.poster === '') this.errors.push('poster');

    if (this.errors.length === 0) {
      this.validated = true;
    } else {
      console.log(this.errors)
      this.validateFields();
    }
  }

  // Disable Inputs and VerifyButton after validations
  disable() {
    if (this.validated) {
      this.editForm.controls['type'].disable();
      this.editForm.controls['title'].disable();
      this.editForm.controls['description'].disable();
      this.editForm.controls['category'].disable();
      this.editForm.controls['actors'].disable();
      this.editForm.controls['mp4'].disable();
      this.editForm.controls['likes'].disable();
      this.editForm.controls['poster'].disable();
      this.verifyButton = true;
      return true;
    };
  }

  // Active BTN_SAVE
  activeSubmit() {
    if (this.verifyButton) {
      return false;
    } else {
      return true;
    }
  }

  // Edit
  edit(value) {
    this.isUpdated = false;
    this.elementService.updateElement(this.id_element, value).subscribe(res => {
      console.log(res);
      this.isUpdated = true;
      this.updated.emit(this.isUpdated);
    });
  }
}

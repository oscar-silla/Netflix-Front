import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class EditComponent implements OnInit {

  editForm: FormGroup

  validated: boolean = false;
  verifyButton:boolean = false;

  errors: string[] = [];
  err_title: boolean = false;
  err_description: boolean = false;
  err_category: boolean = false;
  err_actors: boolean = false;
  err_mp4: boolean = false;
  err_likes: boolean = false;
  err_poster: boolean = false;

  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {
    config.backdrop = 'static';
    config.keyboard = false;
    // Validator
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      actors: ['', Validators.required],
      mp4: ['', Validators.required],
      likes: ['', Validators.required],
      poster: ['', Validators.required]
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
  }

  validateFields() {
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

  clean() {
    this.err_title = false;
    this.err_description = false;
    this.err_category = false;
    this.err_actors = false;
    this.err_mp4 = false;
    this.err_likes = false;
    this.err_poster = false;
  }

  edit(value) {
    this.clean();
    this.errors = [];
    console.log(this.errors)
    // Validations
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

  disable() {
    if (this.validated) {
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

  activeSubmit() {
    
  }

  save(value) {
    console.log(value);
  }
}

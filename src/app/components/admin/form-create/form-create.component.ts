import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementService } from 'src/app/services/element.service';

// Interface
import { Element } from '../../../interfaces/element';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent implements OnInit {

  createForm: FormGroup;
  error: string[] = [];
  created: boolean;
  err_title: boolean = false;
  err_description: boolean = false;
  err_category: boolean = false;
  err_actors: boolean = false;
  err_mp4: boolean = false;
  err_likes: boolean = false;
  err_poster: boolean = false;

  constructor(private formBuilder: FormBuilder, private elementService: ElementService) {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      actors: ['', Validators.required],
      mp4: ['', Validators.required],
      likes: ['', Validators.required],
      poster: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  // Validations
  validateFields(): void {
    if (this.error.includes('title')) {
      this.err_title = true;
    }
    if (this.error.includes('description')) {
      this.err_description = true;
    }
    if (this.error.includes('category')) {
      this.err_category = true;
    }
    if (this.error.includes('actors')) {
      this.err_actors = true;
    }
    if (this.error.includes('mp4')) {
      this.err_mp4 = true;
    }
    if (this.error.includes('likes')) {
      this.err_likes = true;
    }
    if (this.error.includes('poster')) {
      this.err_poster = true;
    }
  }

  // Clean Validations
  clean() {
    this.err_title = false;
    this.err_description = false;
    this.err_category = false;
    this.err_actors = false;
    this.err_mp4 = false;
    this.err_likes = false;
    this.err_poster = false;
  }

  // Submit Form
  submit(element) {
    this.clean();
    this.error = [];
    // Validations
    if (element.title == '') this.error.push('title');
    if (element.description == '') this.error.push('description');
    if (element.category == '') this.error.push('category');
    if (element.actors == '') this.error.push('actors');
    if (element.mp4 == '') this.error.push('mp4');
    if (element.likes == '') this.error.push('likes');
    if (element.poster == '') this.error.push('poster');
    if (this.error.length == 0) {
      return this.elementService.createElement(element).subscribe(res => {
        this.createForm.reset();
        this.created = true;
      });
    } else {
      console.log(this.error);
      this.validateFields();
    }
  }

  changeCreate(e) {
    this.created = e; // Recibido del hijo (e = false)
  }

}
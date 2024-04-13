import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IFeature } from '../../../models/ifeature.model';
import { Router } from '@angular/router';
import { CommentsService } from '../../../services/api/comments.service';

@Component({
  selector: 'app-comment-new',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comment-new.component.html',
  styleUrl: './comment-new.component.css'
})
export class CommentNewComponent implements OnInit, OnDestroy {

  serviceNewForm: FormGroup
  serviceImagesBase64Loaded: any[] = [null, null, null, null]
  serviceImagesBase64Touched: boolean = false

  waiting: boolean = true
  waitingMessage: string = 'Cargando datos. Por favor espere un momento'
  errorMessage: string = ''

  private _apiComments = inject(CommentsService)
  private _router = inject(Router)

  private form = inject(FormBuilder)

  constructor() {
    this.serviceNewForm = this.form.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', Validators.required],
      service_type_id: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('component destroyed')
  }

  formInvalid(): boolean {
    return this.serviceNewForm.invalid || this.imagesEmpty()
  }

  imagesEmpty(): boolean {
    return this.serviceImagesBase64Loaded.toString() === ',,,'
  }

  imagesInvalid(): boolean {
    return this.imagesEmpty() && this.serviceImagesBase64Touched
  }

  send() {
    this.waiting = true

    let formData: any = new FormData()

    Object.keys(this.serviceNewForm.controls).forEach(formControlName => {
      formData.append(formControlName, this.serviceNewForm.get(formControlName)?.value)
    })

    this.serviceImagesBase64Loaded.forEach((image, i) => {
      if (this.serviceImagesBase64Loaded[i]) {
        formData.append('data[]', this.serviceImagesBase64Loaded[i])
      }
    })

    this._apiComments.postComment(formData)
      .subscribe({
        next: (data: IFeature) => {
          console.log(`Returned:${data}`)
          this._router.navigate(['services-list', { message: 'Servicio creado exitosamente' }])
          this.waitingMessage = 'Salvando datos. Espere un momento'
          this.waiting = false
        },
        error: (error: any) => {
          console.log(`Error: ${error.message}`)
          this._router.navigate(['services-list', { message: 'No se pudo crear el Servicio' }])
          console.log(error)
          this.waiting = false
        }
      })
  }

  hasErrors(controlName: string, errorType: string) {
    return this.serviceNewForm.get(controlName)?.hasError(errorType) && this.serviceNewForm.get(controlName)?.touched
  }

  imageBase64LoadedListener($event: any, index: number) {
    if (!this.serviceImagesBase64Touched) {
      this.serviceImagesBase64Touched = true
    }

    this.serviceImagesBase64Loaded[index] = $event
  }
}

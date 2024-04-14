import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FeaturesService } from '../../../services/api/features.service';
import { IComment } from '../../../models/icomment.model';

@Component({
  selector: 'app-comment-new',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comment-new.component.html',
  styleUrl: './comment-new.component.css'
})
export class CommentNewComponent implements OnInit {

  commentNewForm: FormGroup
  featureId: number = 0
  waiting: boolean = false
  waitingMessage: string = 'Loading... Please wait'
  errorMessage: string = ''

  private _apiFeatures = inject(FeaturesService)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)

  private form = inject(FormBuilder)

  constructor() {
    this.commentNewForm = this.form.group({
      body: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (params: Params) => {
        this.featureId = Number(params['featureId'])
      }
    })
  }

  formInvalid(): boolean {
    return this.commentNewForm.invalid
  }

  send() {
    this.waiting = true

    let formData: any = this.prepareDataToPost()

    this._apiFeatures.postComment(this.featureId, formData)
      .subscribe({
        next: (data: IComment) => {
          this._router.navigate(['**', { message: 'Comment created' }])
          this.waitingMessage = 'Saving comment. Please wait just a moment'
          this.waiting = false
        },
        error: (error: any) => {
          console.log(error)
          this._router.navigate(['**', { message: 'The Comment cannot be created' }])
          this.waiting = false
        }
      })
  }

  prepareDataToPost(): any {
    let formData: any = new FormData()

    Object.keys(this.commentNewForm.controls).forEach(formControlName => {
      formData.append(formControlName, this.commentNewForm.get(formControlName)?.value)
    })

    return formData
  }

  hasErrors(controlName: string, errorType: string) {
    return this.commentNewForm.get(controlName)?.hasError(errorType) && this.commentNewForm.get(controlName)?.touched
  }

  back(): void {
    this._router.navigate(['**'])
  }
}

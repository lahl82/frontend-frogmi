import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentNewComponent } from './comment-new.component';

describe('CommentNewComponent', () => {
  let component: CommentNewComponent;
  let fixture: ComponentFixture<CommentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

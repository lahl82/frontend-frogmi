import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';

describe('UsersService', () => {
  let comment: CommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    comment = TestBed.inject(CommentsService);
  });

  it('should be created', () => {
    expect(comment).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ChatDosService } from './chat-dos.service';

describe('ChatDosService', () => {
  let service: ChatDosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatDosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

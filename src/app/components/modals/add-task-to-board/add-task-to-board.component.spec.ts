import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskToBoardComponent } from './add-task-to-board.component';

describe('AddTaskToBoardComponent', () => {
  let component: AddTaskToBoardComponent;
  let fixture: ComponentFixture<AddTaskToBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskToBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTaskToBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Careerespage } from './careerespage';

describe('Careerespage', () => {
  let component: Careerespage;
  let fixture: ComponentFixture<Careerespage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Careerespage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Careerespage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Publicationpage } from './publicationpage';

describe('Publicationpage', () => {
  let component: Publicationpage;
  let fixture: ComponentFixture<Publicationpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Publicationpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Publicationpage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

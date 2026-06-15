import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusQuadrosComponent } from './meus-quadros-component';

describe('MeusQuadrosComponent', () => {
  let component: MeusQuadrosComponent;
  let fixture: ComponentFixture<MeusQuadrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeusQuadrosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MeusQuadrosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

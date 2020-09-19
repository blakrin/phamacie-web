import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProduitsComponent } from './detail-produits.component';

describe('DetailProduitsComponent', () => {
  let component: DetailProduitsComponent;
  let fixture: ComponentFixture<DetailProduitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailProduitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

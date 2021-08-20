import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContratacionPage } from './contratacion.page';

describe('ContratacionPage', () => {
  let component: ContratacionPage;
  let fixture: ComponentFixture<ContratacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContratacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

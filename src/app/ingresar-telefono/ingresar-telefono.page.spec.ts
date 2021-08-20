import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngresarTelefonoPage } from './ingresar-telefono.page';

describe('IngresarTelefonoPage', () => {
  let component: IngresarTelefonoPage;
  let fixture: ComponentFixture<IngresarTelefonoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarTelefonoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresarTelefonoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

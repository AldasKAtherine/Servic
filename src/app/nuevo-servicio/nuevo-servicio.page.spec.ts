import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevoServicioPage } from './nuevo-servicio.page';

describe('NuevoServicioPage', () => {
  let component: NuevoServicioPage;
  let fixture: ComponentFixture<NuevoServicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoServicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoServicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

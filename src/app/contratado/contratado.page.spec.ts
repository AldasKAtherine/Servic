import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContratadoPage } from './contratado.page';

describe('ContratadoPage', () => {
  let component: ContratadoPage;
  let fixture: ComponentFixture<ContratadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContratadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

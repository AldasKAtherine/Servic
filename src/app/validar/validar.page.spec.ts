import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidarPage } from './validar.page';

describe('ValidarPage', () => {
  let component: ValidarPage;
  let fixture: ComponentFixture<ValidarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

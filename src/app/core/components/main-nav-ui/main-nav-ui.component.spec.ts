import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { MainNavUIComponent } from './main-nav-ui.component';

describe('MainNavUIComponent', () => {
  let component: MainNavUIComponent;
  let fixture: ComponentFixture<MainNavUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNavUIComponent ],
      imports: [SharedModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create and render Title', () => {
    expect(component).toBeTruthy();
    expect(component.title).toEqual('TODO');
  });

  it('initialize components properly', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


});

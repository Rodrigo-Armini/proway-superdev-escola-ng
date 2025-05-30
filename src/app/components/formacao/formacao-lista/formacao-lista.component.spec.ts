import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormacaoListaComponent } from './formacao-lista.component';

describe('FormacaoListaComponent', () => {
  let component: FormacaoListaComponent;
  let fixture: ComponentFixture<FormacaoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormacaoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormacaoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

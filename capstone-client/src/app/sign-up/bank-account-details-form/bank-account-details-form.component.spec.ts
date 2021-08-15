import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountDetailsFormComponent } from './bank-account-details-form.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from '../sign-up.component';
import { SignUpClientComponent } from '../sign-up-client.component';
import { SignUpSupplierComponent } from '../sign-up-supplier.component';
import { PersonalDataFormComponent } from '../personal-data-form/personal-data-form.component';
import { UserDataFormComponent } from '../user-data-form/user-data-form.component';
import { UserTypeButtonComponent } from '../user-type-button/user-type-button.component';
import { FormHeaderComponent } from '../form-header/form-header.component';
import { SuccessFeedbackComponent } from '../success-feedback/success-feedback.component';

describe('BankAccountDetailsFormComponent', () => {
  let component: BankAccountDetailsFormComponent;
  let fixture: ComponentFixture<BankAccountDetailsFormComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        SignUpComponent,
        SignUpClientComponent,
        SignUpSupplierComponent,
        PersonalDataFormComponent,
        BankAccountDetailsFormComponent,
        UserDataFormComponent,
        UserTypeButtonComponent,
        FormHeaderComponent,
        SuccessFeedbackComponent,
      ],
    }).compileComponents();
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankAccountDetailsFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

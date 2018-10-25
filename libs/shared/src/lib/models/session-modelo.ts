import { Validators } from '@angular/forms';

import { validEmail, isAlphanumeric, hasSymbol } from '../validators';

export class Session {
  private isAlpha;
  private hasSymbol;
  private _form;
  constructor( formBuilder ) {
    this.isAlpha = isAlphanumeric();
    this.hasSymbol = hasSymbol();
    this._form = formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        validEmail()
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])]
    });
  }
  get form() { return this._form; }
  get payload() {
    return this.form.value;
  }
  get validEmail() {
    return this._form.controls.email.valid;
  }
  get password() {
    return this._form.controls.password.value;
  }
  get validPasswordLength() {
    return this._form.controls.password.value.length >= 8;
  }
  get isPasswordAlphanumeric() {
    return this._form.controls.password.value.match(/[A-Za-z]+/) && this._form.controls.password.value.match(/[0-9]+/);
  }
  get hasPasswordSymbol() {
    return this._form.controls.password.value.match(/\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\-|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:/);
  }
}

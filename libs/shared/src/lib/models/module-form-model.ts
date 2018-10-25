import { ModuleModel } from "./module-model";
import { Validators } from "@angular/forms";

export class ModuleFormModel extends ModuleModel {
  private _form;
  constructor( formBuilder, module?) {
    super(module || null);

    this._form = formBuilder.group({
      title: [this.title, Validators.compose([Validators.required])],
      deck: [this.deck, Validators.compose([Validators.required])],
      link: [this.link, Validators.compose([Validators.required])],
    });
  }
  get form() { return this._form; }

  get isTitleValid() { return this._form.controls.title.valid; }
  get isTitleTouched() { return this._form.controls.title.touched; }
  get isTitleDirty() { return this._form.controls.title.dirty; }
  get titleRequired() { return this.isTitleTouched && this._form.controls.title.hasError('required'); }

  get isDeckValid() { return this._form.controls.deck.valid; }
  get isDeckTouched() { return this._form.controls.deck.touched; }
  get isDeckDirty() { return this._form.controls.deck.dirty; }
  get deckRequired() { return this.isDeckTouched && this._form.controls.deck.hasError('required'); }

  get isLinkValid() { return this._form.controls.link.valid; }
  get isLinkTouched() { return this._form.controls.link.touched; }
  get isLinkDirty() { return this._form.controls.link.dirty; }
  get linkRequired() { return this.isLinkTouched && this._form.controls.link.hasError('required'); }

  get payload() {
    return this._form.value;
  }

  get editable() {
    return {
      title: this.isTitleValid && this.isTitleDirty && this.isTitleTouched,
      deck: this.isDeckValid && this.isDeckDirty && this.isDeckTouched,
      link: this.isLinkValid && this.isLinkDirty && this.isLinkTouched,
      tags: true
    };
  }
  reset() {
    this._form.controls.title.setValue( '');
    this._form.controls.deck.setValue( '');
    this._form.controls.link.setValue( '');

  }
}

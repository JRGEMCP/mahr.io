import {Validators} from "@angular/forms";
import { EntityModelo } from './entity.modelo';
export class EntityFormModelo extends EntityModelo {
  private _entity;
  constructor( formBuilder, entity?) {
    super(entity);
    this._entity = formBuilder.group({
      title: [ this.title, Validators.compose([Validators.required])],
      link: [this.link, Validators.compose([Validators.required])],
      deck: [this.deck, Validators.compose([Validators.required])],
      thumb: [this.thumb ],
      tags: [ this.tags],
      featured: [this.featured]
    });
  }

  get form() {
    return this._entity;
  }
  get isTitleValid() { return this._entity.controls.title.valid; }
  get isTitleTouched() { return this._entity.controls.title.touched; }
  get isTitleDirty() { return this._entity.controls.title.dirty; }
  get titleRequired() { return this.isTitleTouched && this._entity.controls.title.hasError('required'); }

  get isDeckValid() { return this._entity.controls.deck.valid; }
  get isDeckTouched() { return this._entity.controls.deck.touched; }
  get isDeckDirty() { return this._entity.controls.deck.dirty; }
  get deckRequired() { return this.isDeckTouched && this._entity.controls.deck.hasError('required'); }

  get isLinkValid() { return this._entity.controls.link.valid; }
  get isLinkTouched() { return this._entity.controls.link.touched; }
  get isLinkDirty() { return this._entity.controls.link.dirty; }
  get linkRequired() { return this.isLinkTouched && this._entity.controls.link.hasError('required'); }

  get isEssentialsValid() {
    return this.isTitleValid && this.isDeckValid && this.isLinkValid;
  }

  get payload() {
    return this._entity.value;
  }

  get editable() {
    return {
      title: this.isTitleValid && this.isTitleDirty && this.isTitleTouched,
      deck: this.isDeckValid && this.isDeckDirty && this.isDeckTouched,
      link: this.isLinkValid && this.isLinkDirty && this.isLinkTouched,
      thumb: true,
      tags: true,
      featured: true
    };
  }
}

import {
  Component,
  Input,
  Output,
  OnInit,
  OnDestroy,
  OnChanges,
  forwardRef,
  HostBinding,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
const noop = () => {};

export const KEYS = {
  backspace: 8,
  comma: 188,
  downArrow: 40,
  enter: 13,
  esc: 27,
  space: 32,
  upArrow: 38
};

@Component({
  selector: 'm8io-tags',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ChipsComponent), multi: true }],
  encapsulation: ViewEncapsulation.None
})
export class ChipsComponent implements OnInit, OnChanges, OnDestroy {
  public isFocused;
  public chipInputForm;
  public autocompleteResults;
  public chipsList;
  public selectedChip;
  public chipInputSubscription;
  public splitRegExp;

  private _tempPlaceholder;

  @Input() addOnBlur;
  @Input() addOnComma;
  @Input() addOnEnter;
  @Input() addOnPaste;
  @Input() addOnSpace;
  @Input() allowDuplicates;
  @Input() allowedChipsPattern;
  @Input() autocomplete;
  @Input() autocompleteItems;
  @Input() autocompleteMustMatch;
  @Input() autocompleteSelectFirstItem;
  @Input() pasteSplitPattern;
  @Input() placeholder;
  @Input() textarea;
  @Input() canEdit;

  @Output() addChip;
  @Output() removeChip;
  @Output() onFocus;
  @Output() onBlur;

  @HostBinding('class.focus') focused = this.isFocused;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(private formBuilder: FormBuilder) {
    this.addOnBlur = true;
    this.addOnComma = true;
    this.addOnEnter = true;
    this.addOnPaste = true;
    this.addOnSpace = false;
    this.allowDuplicates = false;
    this.allowedChipsPattern = /.+/;
    this.autocomplete = false;
    this.autocompleteItems = [];
    this.autocompleteMustMatch = true;
    this.autocompleteSelectFirstItem = true;
    this.isFocused = false;
    this.pasteSplitPattern = ',';
    this.placeholder = 'Add a new value';
    this.textarea = false;
    this.canEdit = false;

    this.addChip = new EventEmitter();
    this.removeChip = new EventEmitter();
    this.onFocus = new EventEmitter();
    this.onBlur = new EventEmitter();

    this.autocompleteResults = [];
    this.chipsList = [];

    // Create the form group before ngOnInit to avoid exceptions
    this.chipInputForm = this.formBuilder.group({
      chipsInputField: [null]
    });
  }

  get chipsInputField(): any {
    return this.chipInputForm.controls['chipsInputField'];
  }
  get inputValue(): any {
    return this.chipsInputField.value;
  }

  ngOnInit() {
    this.chipsList = [];

    this.splitRegExp = new RegExp(this.pasteSplitPattern);

    this.chipInputSubscription = this.chipsInputField.valueChanges
      .pipe( tap((value: string) => {
        this.autocompleteResults = this.autocompleteItems.filter( (item: string) => {
          /**
           * _isChipUnique makes sure to remove items from the autocompelte dropdown if they have
           * already been added to the model, and allowDuplicates is false
           */
          return item.toLowerCase().indexOf(value.toLowerCase()) > -1 && this._isChipUnique(item);
        });
      }))
      .subscribe();
  }

  ngOnChanges(changes) {
    // Observe changes in the inputs
    if (changes.canEdit) {
      if (changes.canEdit.currentValue) {
        this.chipsInputField.enable();
        this.placeholder = this._tempPlaceholder || 'Add a new value';
      } else {
        this.chipsInputField.disable();
        this._tempPlaceholder = this.placeholder;
        this.placeholder = '';
      }
    }
  }

  onKeydown(event) {
    const key = event.keyCode;
    switch (key) {
      case KEYS.backspace:
        this._handleBackspace();
        break;

      case KEYS.enter:
        if (this.addOnEnter && !this.showAutocomplete() && this.inputValue) {
          this._addChips([this.inputValue]);
          event.preventDefault();
        }
        break;

      case KEYS.comma:
        if (this.addOnComma && this.inputValue) {
          this._addChips([this.inputValue]);
          event.preventDefault();
        }
        break;

      case KEYS.space:
        if (this.addOnSpace && this.inputValue) {
          this._addChips([this.inputValue]);
          event.preventDefault();
        }
        break;

      default:
        break;
    }
  }

  onInputBlurred(event) {
    if (this.addOnBlur && this.inputValue) {
      this._addChips([this.inputValue]);
    }
    this.isFocused = false;

    this.onBlur.emit({});
  }

  onInputFocused(event) {
    this.isFocused = true;

    this.onFocus.emit({});
  }

  onInputPaste(event) {
    const clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
    const pastedString = clipboardData.getData('text/plain');
    const chips = this._splitString(pastedString);
    this._addChips(chips);
    setTimeout(() => this._resetInput());
  }

  onAutocompleteSelect(selectedItem) {
    this._addChips([selectedItem]);
  }

  onAutocompleteEnter() {
    if (this.addOnEnter && this.showAutocomplete() && !this.autocompleteMustMatch && this.inputValue) {
      this._addChips([this.inputValue]);
    }
  }

  showAutocomplete() {
    return this.autocomplete && this.autocompleteItems.length > 0 && this.inputValue.length > 0;
  }

  _splitString(chipString) {
    chipString = chipString.trim();
    const chips = chipString.split(this.splitRegExp);
    return chips.filter(chip => !!chip);
  }

  _isChipValid(chipString) {
    return this.allowedChipsPattern.test(chipString) && this._isChipUnique(chipString);
  }

  _isChipUnique(chipString) {
    return this.allowDuplicates ? true : this.chipsList.indexOf(chipString) === -1;
  }

  _isChipAutocompleteItem(chipString) {
    return this.autocompleteItems.chipsInputField(chipString) > -1;
  }

  _emitChipAdded(addedChips) {
    addedChips.forEach(chip => this.addChip.emit(chip));
  }

  _emitChipRemoved(removedChip) {
    this.removeChip.emit(removedChip);
  }

  _addChips(chips) {
    const validChips = chips
      .map(chip => chip.trim())
      .filter(chip => this._isChipValid(chip))
      .filter((chip, index, chipArray) => chipArray.indexOf(chip) === index)
      .filter(
        chip => (this.showAutocomplete() && this.autocompleteMustMatch ? this._isChipAutocompleteItem(chip) : true)
      );

    this.chipsList = this.chipsList.concat(validChips);
    this._resetSelected();
    this._resetInput();
    this.onChange(this.chipsList);
    this._emitChipAdded(validChips);
  }

  _removeChip(chipIndexToRemove) {
    const removedChip = this.chipsList[chipIndexToRemove];
    this.chipsList.splice(chipIndexToRemove, 1);
    this._resetSelected();
    this.onChange(this.chipsList);
    this._emitChipRemoved(removedChip);
  }

  _isBlank(obj) {
    return obj === undefined || obj === null;
  }

  _handleBackspace() {
    if (!this.inputValue.length && this.chipsList.length) {
      if (!this._isBlank(this.selectedChip)) {
        this._removeChip(this.selectedChip);
      } else {
        this.selectedChip = this.chipsList.length - 1;
      }
    }
  }

  _resetSelected() {
    this.selectedChip = null;
  }

  _resetInput() {
    this.chipsInputField.setValue('');
  }

  writeValue(value) {
    this.chipsList = value ? value : [];
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    this.chipInputSubscription.unsubscribe();
  }
}

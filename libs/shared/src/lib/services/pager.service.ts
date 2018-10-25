import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagerService {
  private _items;
  private _loaded;
  private _failed;
  private _pageIndex;
  private _pageSize;
  private _pageCount;
  private _pageNumbers: Array<number>;
  private _numbersCount;

  constructor() {
    this._items = [];

    this._loaded = false; // Loaded indicates items have been received
    this._failed = false; // Failed indicates something wrong has happened, used to show/hide the empty dashboard message

    this._pageIndex = 0;
    this._pageSize = 10;
    this._pageCount = 0;
    this._pageNumbers = [];
    this._numbersCount = 5;
  }

  get page() {
    // Return the right page items
    return this._items.slice(this._pageIndex * this._pageSize, (this._pageIndex + 1) * this._pageSize);
  }

  get items() {
    return this._items;
  }
  set items(value) {
    // Set the items
    this._items = value;

    // Recalculate page count
    this._pageCount = Math.ceil(this._items.length / this._pageSize);

    // Create the array of page numbers
    this._pageNumbers = Array(this._pageCount)
      .fill(0)
      .map((_, i) => i + 1);
  }

  get loaded() {
    return this._loaded;
  }
  set loaded(value) {
    this._loaded = value;
  }

  get failed() {
    return this._failed;
  }
  set failed(value) {
    this._failed = value;
  }

  get index() {
    return this._pageIndex;
  }
  set index(value) {
    this._pageIndex = value;
  }

  get size() {
    return this._pageSize;
  }
  set size(value) {
    this._pageSize = value;

    // Recalculate page count
    this._pageCount = Math.ceil(this._items.length / this._pageSize);
    // Create the array of page numbers
    this._pageNumbers = Array(this._pageCount)
      .fill(0)
      .map((_, i) => i + 1);
  }

  get pages() {
    return this._pageCount;
  }
  get pageNumbers() {
    // There are less pages than the max numbers to display so display them all
    if (this._pageCount <= this._numbersCount) {
      return this._pageNumbers;
    }

    let startIndex = 0;
    let endIndex = 0;

    // Page index is less than numbersCount / 2 away from the start, so show the first numbersCount
    if (this._pageIndex < Math.ceil(this._numbersCount / 2)) {
      startIndex = 0;
      endIndex = this._numbersCount;
    } else if (this._pageIndex > this._pageCount - Math.ceil(this._numbersCount / 2)) {
      // This means is at the end of the pager, center around the end
      startIndex = this._pageCount - this._numbersCount;
      endIndex = this._pageCount;
    } else {
      // Anywhere in the middle, center around current page index
      startIndex = this._pageIndex - (Math.ceil(this._numbersCount / 2) - 1);
      endIndex = this._pageIndex + Math.ceil(this._numbersCount / 2);
    }

    return this._pageNumbers.slice(startIndex, endIndex);
  }

  get isLast() {
    return this._pageCount > 0 ? this._pageIndex === this._pageCount - 1 : true;
  }
  get isFirst() {
    return this._pageIndex === 0;
  }
  get hasNext() {
    return this._pageCount > 0 ? this._pageIndex < this._pageCount - 1 : false;
  }
  get hasPrev() {
    return this._pageIndex > 0;
  }

  get ready() {
    return this._loaded && !this._failed;
  }

  isPage(index) {
    return this._pageIndex === index;
  }

  next() {
    if (this._pageIndex < this._pageCount - 1) {
      this._pageIndex += 1;
    }
  }

  prev() {
    if (this._pageIndex > 0) {
      this._pageIndex -= 1;
    }
  }

  setPage(index) {
    if (index < this._pageCount && index >= 0) {
      this._pageIndex = index;
    }
  }

  first() {
    this._pageIndex = 0;
  }

  last() {
    this._pageIndex = this._pageCount - 1;
  }
}

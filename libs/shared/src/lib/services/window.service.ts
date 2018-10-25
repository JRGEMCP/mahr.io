import { Injectable } from '@angular/core';

const _window = () => {
  // return the global native browser window object
  return window;
};

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  constructor() { }

  get nativeWindow() {
    return _window();
  }
}


import { render, tree } from 'deku';


export function mount(node) {
  let element = document.createElement('div');
  document.body.appendChild(element);

  let app = tree(node);
  let renderer = render(app, element);

  return {
    element,
    unmount() {
      renderer.remove();
      document.body.removeChild(element);
    }
  };
}

export function delay(fn, ms = 250) {
  return setTimeout(fn, ms);
}

export function validationMessage(validity, el) {
  if (validity.valueMissing) return 'required';
  return el.validationMessage;
}

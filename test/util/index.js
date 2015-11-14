
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

export function delay(fn, ms = 100) {
  return setTimeout(fn, ms);
}


import { render, tree } from 'dekujs/deku';


export function component(component = {}) {
  let { props, state } = component;
  if (!props) props = {};
  if (!state) state = {};

  props.children = normalizeChildren(props.children);

  return { props, state };
}

export function normalizeChildren(children = []) {
  if (!Array.isArray(children)) return normalizeChildren([ children ]);

  return children.map(child => {
    if (typeof child === 'string') return { type: 'text', data: child };
    return child;
  });
}

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

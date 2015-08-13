
export default function generate(component = {}) {
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

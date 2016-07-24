
import element from 'virtual-element';

/**
 * Renders a single `<select>` element. Most of the props are simply attributes
 * that get added to the element.
 *
 * The `options` and `value` props are used to set up the available `<option>`
 * elements, as well as selecting one of those options.
 *
 * @param {Object} component
 * @return {VirtualNode}
 */
export function render({ props }) {
  // general props
  let { disabled, id, name, required, size } = props;
  // event handlers
  let { onBlur, onChange, onFocus } = props;

  let selectAttrs = {
    disabled, id, name, required, size,
    onBlur, onChange, onFocus
  };

  return (
    <select {...selectAttrs} class={props.class}>
      {options(props.options, props.value, props.placeholder)}
    </select>
  );
}


/**
 * Generates an array of `<option>` elements given the input `options`
 * and selected `value`.
 *
 * The `options` can be a flat array of strings: (in this case, the label
 * and value will be identical)
 *
 *    [ 'a', 'b', 'c' ]
 *
 * It can also be an array of objects that have an `label` and `value`
 * property:
 *
 *    [
 *      { label: 'a', value: 1 },
 *      { label: 'b', value: 2 },
 *      { label: 'c', value: 3 }
 *    ]
 *
 * When given, the `placeholder` creates an extra option at the beginning
 * of the list.
 *
 *    [
 *      { label: 'placeholder' },
 *      { label: 'a', value: 1 },
 *      { label: 'b', value: 2 },
 *      { label: 'c', value: 3 },
 *    ]
 *
 * @param {Array} options         List of options.
 * @param {*} [value]             The value to consider selected.
 * @param {String} [placeholder]  The label for the dummy first option
 * @return {Array}
 */
function options(options = [], value, placeholder) {
  if (placeholder) {
    options.unshift({ label: placeholder });
  }

  return options
    // normalize options
    .map(item => {
      return typeof item === 'object' ? item : { value: item, label: item };
    })
    // generate elements
    .map(item => {
      return (
        <option selected={item.value === value} value={item.value}>
          {item.label}
        </option>
      );
    });
}

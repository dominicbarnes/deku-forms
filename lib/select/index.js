
/**
 * Dependencies.
 */
import dom from 'dekujs/virtual-element';


/**
 * Available props
 */
export let propTypes = {
  // Disables the input.
  disabled: { type: 'boolean' },

  // Adds an id to this element, plus the label within the field for better UX.
  id: { type: 'string' },

  // Sets the input name, which is used during serializing.
  name: { type: 'string' },

  // Fired when the input's value changes.
  onChange: { type: 'function' },

  // Indicates that this field must be entered in order to be validated.
  required: { type: 'boolean' },

  // Sets the input size attribute, generally CSS is encouraged here though.
  size: { type: 'number' },

  // Sets the input value.
  value: { type: 'string' }
};


/**
 * Renders a single `<select>` element. Most of the props are simply attributes
 * that get added to the element.
 *
 * The `options` and `value` props are used to set up the available `<option>`
 * elements, as well as selecting one of those options.
 *
 * @param {Object} component  The Deku component.
 * @return {VirtualNode}
 */
export function render({ props }) {
  // general props
  let { disabled, id, name, required, placeholder, size } = props;
  // event handlers
  let { onChange } = props;

  let selectAttrs = {
    // general props
    disabled, id, name, placeholder, required, size,

    // events
    onChange
  };

  return (
    <select {...selectAttrs}>
      {options(props.options, props.value)}
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
 * @param {Array} options  List of options.
 * @param {*} [value]      The value to consider selected.
 * @return {Array}
 */
function options(options = [], value) {
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

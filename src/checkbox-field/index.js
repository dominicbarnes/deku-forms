
/** @jsx dom */

import dom from 'magic-virtual-element';
import * as Field from '../field';


/**
 * Available props
 */
export let propTypes = {
  // Sets the checkbox as checked.
  checked: { type: 'boolean' },

  // Adds custom CSS classes to the form field.
  class: { type: 'string' },

  // Adds a hint to the form field.
  hint: { type: 'string' },

  // Sets the label for the form field.
  label: { type: 'string' },

  // Sets the description for the form field.
  description: { type: 'string' },

  // Sets the input name, which is used during serializing.
  name: { type: 'string' },

  // Fired when the input loses focus.
  onBlur: { type: 'function' },

  // Fired when the input's value changes.
  onChange: { type: 'function' },

  // Fired when the input is focused.
  onFocus: { type: 'function' },

  // Indicates that this field must be entered in order to be validated.
  required: { type: 'boolean' },

  // Used to customize the error message.
  validationMessage: { type: 'function' },

  // Sets the input value.
  value: { type: 'string' }
};

/**
 * Default properties, generally this list will remain small, as the browser
 * has it's own (reasonable) defaults.
 */
export let defaultProps = {
  // the default here is to return whatever the default validation message is
  validationMessage(validity, el) {
    return el.validationMessage;
  }
};

/**
 * Renders a field with a single <input>, generally used as some sort of text
 * field. Any of the HTML5 input types is usable here, but if you find yourself
 * doing something a little more advanced, consider using another component or
 * writing a custom field.
 *
 * @param {Object} component
 * @param {Function} setState
 * @return {VirtualNode}
 */
export function render({ props, state }, setState) {
  // general props
  let { checked, name, value } = props;
  // field props
  let { hint, label, description } = props;
  // validation props
  let { required } = props;
  // event props
  let { onBlur, onChange, onFocus } = props;
  // state
  let { error } = state;

  // attributes for the Field
  let fieldAttrs = { error, hint, description };

  // attributes for the generated <input>
  let inputAttrs = {
    checked, name, value, required, type: 'checkbox',
    onBlur, onFocus
  };

  return (
    <Field class={[ 'CheckboxField', props.class ]} {...fieldAttrs}>
      <label>
        <input {...inputAttrs} onChange={handleChange} onInvalid={checkError} />
        {label}
      </label>
    </Field>
  );

  /**
   * When input is being handled on the input, we need to call the handler if
   * the user has specified one. In addition, we'll also update the error state.
   *
   * @param {Event} e
   */
  function handleChange(e) {
    if (onChange) onChange(e);
    checkError(e);
  }

  /**
   * Updates the error state for the field, based on the target element's
   * ValidityState object.
   *
   * @param {Event} e
   */
  function checkError(e) {
    let el = e.target;
    let validity = el.validity;
    setState({ error: props.validationMessage(validity, el) });
  }
}

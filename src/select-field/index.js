
/** @jsx dom */

import dom from 'magic-virtual-element';
import * as Field from '../field';
import * as Select from '../select';


/**
 * Available props
 */
export let propTypes = {
  // Adds custom CSS classes to the form field.
  class: { type: 'string' },

  // Disables the input.
  disabled: { type: 'boolean' },

  // Explicitly sets an error message (used during async validation)
  error: { type: 'string' },

  // Adds an id to this element, plus the label within the field for better UX.
  id: { type: 'string' },

  // Adds a hint to the form field.
  hint: { type: 'string' },

  // Sets the label for the form field.
  label: { type: 'string' },

  // Sets the input name, which is used during serializing.
  name: { type: 'string' },

  // Fired when the input's value changes.
  onChange: { type: 'function' },

  // Adds placeholder text to the input.
  placeholder: { type: 'string' },

  // Indicates that this field must be entered in order to be validated.
  required: { type: 'boolean' },

  // Sets the input size attribute, generally CSS is encouraged here though.
  size: { type: 'number' },

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
 * An input control for accepting text input, using an `input[type=text]`
 * or a `textarea`. For other input types, use `InputField` instead.
 *
 * @param {Object} component
 * @param {Function} setState
 * @return {VirtualNode}
 */
export function render({ props, state }, setState) {
  // general props
  let { disabled, name, options, placeholder, size, value } = props;
  // field props
  let { hint, id, label } = props;
  // validation props
  let { required } = props;
  // event props
  let { onChange } = props;
  // error
  let error = props.error || state.error;

  // attributes for the Field
  let fieldAttrs = { error, hint, id, label };

  // attributes for the Select
  let selectAttrs = {
    disabled, id, name, options, placeholder, required, size, value
  };

  // field classes

  return (
    <Field class={[ 'SelectField', props.class ]} {...fieldAttrs}>
      <Select {...selectAttrs} onChange={handleChange} onInvalid={checkError} />
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

/**
 * When an error is specified in props, it means there is async validation
 * taking place. In this case, the specified error must always take priority.
 *
 * @param {Object} component
 * @param {HTMLElement} el
 */
export function afterRender({ props, state }, el) {
  let input = el.querySelector('select');
  input.setCustomValidity(props.error || '');
}

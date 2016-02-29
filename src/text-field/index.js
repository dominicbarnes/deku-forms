
/** @jsx dom */

import dom from 'magic-virtual-element';
import * as Field from '../field';


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

  // Sets the description for the form field.
  description: { type: 'string' },

  // Sets the maximum length for the input. (used during validation)
  maxlength: { type: 'number' },

  // Sets the minimum length for the input. (used during validation)
  minlength: { type: 'number' },

  // Multiline inputs use <textarea> instead of <input>
  multiline: { type: 'boolean' },

  // Sets the input name, which is used during serializing.
  name: { type: 'string' },

  // Fired when the input loses focus.
  onBlur: { type: 'function' },

  // Fired when the input's value changes.
  onChange: { type: 'function' },

  // Fired when the input is focused.
  onFocus: { type: 'function' },

  // Fired while the input is receiving input.
  onInput: { type: 'function' },

  // Sets a regex pattern that the input must match to be validated.
  pattern: { type: 'string' },

  // Adds placeholder text to the input.
  placeholder: { type: 'string' },

  // Makes the input read-only.
  readonly: { type: 'boolean' },

  // Indicates that this field must be entered in order to be validated.
  required: { type: 'boolean' },

  // Sets the input size attribute, generally CSS is encouraged here though.
  size: { type: 'number' },

  // If set, this will always validate for input/change events. By default,
  // validation only occurs after the first submission attempt. (or if the
  // control emits an `invalid` event)
  validate: { type: 'boolean' },

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
  let { disabled, name, placeholder, readonly, size, value } = props;
  // field props
  let { hint, id, label, description } = props;
  // validation props
  let { maxlength, minlength, pattern, required } = props;
  // event props
  let { onChange, onInput, onFocus, onBlur } = props;
  // error
  let error = props.error || state.error;
  // validate
  let validate = props.validate || state.validate;

  // attributes for the generated <input>
  let controlAttrs = {
    // general
    disabled, id, name, placeholder, readonly, size,
    // validation
    maxlength, minlength, pattern, required,
    // events
    onChange: handleChange,
    onInput: handleInput,
    onInvalid: handleInvalid,
    onBlur, onFocus
  };

  // attributes for the Field
  let fieldAttrs = { error, hint, id, label, name, description };

  // use a textarea for multiline, plain input otherwise
  let control = props.multiline
    ? <textarea {...controlAttrs}>{value}</textarea>
    : <input {...controlAttrs} value={value} />;

  return (
    <Field class={[ 'TextField', props.class ]} {...fieldAttrs}>
      {control}
    </Field>
  );

  /**
   * When input is being handled on the input, we need to call the handler if
   * the user has specified one. In addition, we'll also update the error state.
   *
   * @param {Event} e
   */
  function handleInput(e) {
    if (onInput) onInput(e);
    if (validate) checkError(e);
  }

  /**
   * After an input has changed, we should update the error state.
   *
   * @param {Event} e
   */
  function handleChange(e) {
    if (onChange) onChange(e);
    if (validate) checkError(e);
  }

  /**
   * After a field is marked as invalid, we should start validating for all
   * input/change events. We should also set the error message in state.
   *
   * @param {Event} e
   */
  function handleInvalid(e) {
    setState({ validate: true });
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
  let input = el.querySelector('input,textarea');
  input.setCustomValidity(props.error || '');
}

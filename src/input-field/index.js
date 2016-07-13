
/** @jsx dom */

import dom from 'magic-virtual-element';
import * as Field from '../field';


/**
 * Available props
 */
export let propTypes = {
  // Adds accept to type=file inputs.
  accept: { type: 'string' },

  // Supports automatically focusing the input on mount.
  autofocus: { type: 'boolean' },

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

  // Sets a maximum value for the input. (used during validation by
  // number inputs)
  max: { type: 'number' },

  // Sets the maximum length for the input. (used during validation)
  maxlength: { type: 'number' },

  // Sets a minimum value for the input. (used during validation by
  // number inputs)
  min: { type: 'number' },

  // Sets the minimum length for the input. (used during validation)
  minlength: { type: 'number' },

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

  // Sets an increment that the value must be a multiple of in order to be
  // valid. (used by number inputs)
  step: { type: 'number' },

  // Sets the input type, which is useful for validation and UX. Any HTML5
  // input type is valid here, although this input is generally best used
  // for simple text inputs. (avoid checkboxes and such here)
  type: { type: 'string' },

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
  // this just makes targeting inputs with CSS selectors easier
  type: 'text',

  // the default here is to return whatever the default validation message is
  validationMessage(validity, el) {
    return el.validationMessage;
  }
};

/**
 * The afterMount hook is only used to autofocus the input. (when enabled)
 *
 * @param {Object} component
 * @param {HTMLElement} el
 */
export function afterMount({ props }, el) {
  if (props.autofocus) el.getElementsByTagName('input')[0].focus();
}

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
  let { accept, autofocus, disabled, name, placeholder, readonly, size, type, value } = props;
  // field props
  let { hint, id, label, description } = props;
  // validation props
  let { max, maxlength, min, minlength, pattern, required, step } = props;
  // event props
  let { onBlur, onChange, onFocus, onInput } = props;
  // error
  let error = props.error || state.error;
  // validate
  let validate = props.validate || state.validate;

  // attributes for the Field
  let fieldAttrs = { error, hint, id, label, description };

  // attributes for the generated <input>
  let inputAttrs = {
    // general
    accept, autofocus, disabled, id, name, placeholder, readonly, size, type, value,
    // validation
    max, maxlength, min, minlength, pattern, required, step,
    // events
    onBlur, onFocus
  };

  return (
    <Field class={[ 'InputField', props.class ]} {...fieldAttrs}>
      <input {...inputAttrs}
        onChange={handleChange}
        onInput={handleInput}
        onInvalid={handleInvalid} />
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
  let input = el.querySelector('input');
  input.setCustomValidity(props.error || '');
}


/** @jsx dom */

/**
 * Dependencies.
 */
import dom from 'dekujs/virtual-element';
import * as Field from '../field';


/**
 * Available props
 */
export let propTypes = {
  // Disables the input.
  disabled: { type: 'boolean' },

  // Adds an id to this element, plus the label within the field for better UX.
  id: { type: 'string' },

  // Adds a hint to the form field.
  hint: { type: 'string' },

  // Sets the label for the form field.
  label: { type: 'string' },

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

  // Fired when the input's value changes.
  onChange: { type: 'function' },

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
 * Renders a field with a single <input>, generally used as some sort of text
 * field. Any of the HTML5 input types is usable here, but if you find yourself
 * doing something a little more advanced, consider using another component or
 * writing a custom field.
 *
 * @param {Object} component   Deku component.
 * @param {Function} setState  Deku
 * @return {VirtualNode}
 */
export function render({ props, state }, setState) {
  // general props
  let { disabled, name, placeholder, readonly, size, type, value } = props;
  // field props
  let { hint, id, label } = props;
  // validation props
  let { max, maxlength, min, minlength, pattern, required, step } = props;
  // event props
  let { onChange, onInput } = props;
  // state
  let { error } = state;

  // attributes for the generated <input>
  let inputAttrs = {
    // general
    disabled, id, name, placeholder, readonly, size, type, value,
    // validation
    max, maxlength, min, minlength, pattern, required, step,
    // events
    onChange
  };

  return (
    <Field class="InputField" error={error} hint={hint} id={id} label={label}>
      <input {...inputAttrs} onInput={handleInput} onInvalid={checkError} />
    </Field>
  );

  /**
   * When input is being handled on the input, we need to call the handler if
   * the user has specified one. In addition, we'll also update the error state.
   *
   * @param {Event} e  Raw event object.
   */
  function handleInput(e) {
    if (onInput) onInput(e);
    checkError(e);
  }

  /**
   * Updates the error state for the field, based on the target element's
   * ValidityState object.
   *
   * @param {Event} e  Raw event object.
   */
  function checkError(e) {
    let el = e.target;
    let validity = el.validity;
    setState({ error: props.validationMessage(validity, el) });
  }
}


/** @jsx dom */

/**
 * Dependencies.
 */
import dom from 'dekujs/virtual-element';
import * as Field from '../field';
import * as Select from '../select';


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
 * @param {Object} component   Deku component.
 * @param {Function} setState  Deku setState method.
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
  // state
  let { error } = state;

  // attributes for the <Select>
  let attrs = { disabled, id, name, options, placeholder, size, value, required };

  return (
    <Field class="SelectField" error={error} hint={hint} id={id} label={label}>
      <Select {...attrs} onChange={handleChange} onInvalid={checkError} />
    </Field>
  );

  /**
   * When input is being handled on the input, we need to call the handler if
   * the user has specified one. In addition, we'll also update the error state.
   *
   * @param {Event} e  Raw event object.
   */
  function handleChange(e) {
    if (onChange) onChange(e);
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

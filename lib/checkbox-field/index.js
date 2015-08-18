
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
  // Sets the checkbox as checked.
  checked: { type: 'boolean' },

  // Adds a hint to the form field.
  hint: { type: 'string' },

  // Sets the label for the form field.
  label: { type: 'string' },

  // Sets the input name, which is used during serializing.
  name: { type: 'string' },

  // Fired when the input's value changes.
  onChange: { type: 'function' },

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
 * @param {Object} component   Deku component.
 * @param {Function} setState  Deku
 * @return {VirtualNode}
 */
export function render({ props, state }, setState) {
  // general props
  let { checked, name, value } = props;
  // field props
  let { hint, label } = props;
  // validation props
  let { required } = props;
  // event props
  let { onChange } = props;
  // state
  let { error } = state;

  // attributes for the generated <input>
  let attrs = { checked, name, value, required, type: 'checkbox' };

  return (
    <Field class="CheckboxField" error={error} hint={hint}>
      <label>
        <input {...attrs} onChange={handleChange} onInvalid={checkError} />
        {label}
      </label>
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

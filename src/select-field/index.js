
import element from 'magic-virtual-element';
import uuid from 'uuid';
import * as Field from '../field';
import * as Select from '../select';

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
 * This hook is used for both autofocus and setting the default error message.
 *
 * @param {Object} component
 * @param {HTMLElement} el
 */
export function afterMount({ props }, el) {
  let input = el.querySelector('select');
  if (props.autofocus) input.focus();
  input.setCustomValidity(props.error || '');
}

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
  let { autofocus, disabled, name, options, placeholder, size, value } = props;
  // css hooks
  let { labelClass, descriptionClass, controlClass, errorClass, hintClass } = props;
  // field props
  let { hint, label, description } = props;
  // validation props
  let { required } = props;
  // event props
  let { onBlur, onChange, onFocus } = props;
  // error
  let error = props.error || state.error;
  // field id
  let id = props.id || uuid.v1();

  // attributes for the Field
  let fieldAttrs = {
    // general
    error, hint, id, label, description,
    // css hooks
    labelClass, descriptionClass, errorClass, hintClass
  };

  // attributes for the Select
  let selectAttrs = {
    autofocus, disabled, id, name, options, placeholder, required, size, value,
    onBlur, onFocus, class: controlClass
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

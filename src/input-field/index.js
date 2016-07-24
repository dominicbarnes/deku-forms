
import element from 'magic-virtual-element';
import * as Field from '../field';

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
 * This hook is used for both autofocus and setting the default error message.
 *
 * @param {Object} component
 * @param {HTMLElement} el
 */
export function afterMount({ props }, el) {
  let input = el.querySelector('input');
  if (props.autofocus) input.focus();
  // if an error was specified in props, set that right away.
  input.setCustomValidity(props.error || '');
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
  // css hooks
  let { labelClass, descriptionClass, controlClass, errorClass, hintClass } = props;
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
  let fieldAttrs = {
    // general
    error, hint, id, label, description,
    // css hooks
    labelClass, descriptionClass, errorClass, hintClass
  };

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
        class={controlClass}
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

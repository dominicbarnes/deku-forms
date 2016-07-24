
/** @jsx dom */

import dom from 'magic-virtual-element';
import * as Field from '../field';

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
  let input = el.querySelector('input,textarea');
  if (props.autofocus) input.focus();
  // if an error was specified in props, set that right away.
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
  let { autofocus, disabled, name, placeholder, readonly, size, value } = props;
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
    autofocus, disabled, id, name, placeholder, readonly, size,
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

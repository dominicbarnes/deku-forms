
import element from 'magic-virtual-element';
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
  let { autofocus, checked, name, value } = props;
  // css hooks
  let { labelClass, descriptionClass, controlClass, errorClass, hintClass } = props;
  // field props
  let { hint, label, description } = props;
  // validation props
  let { required } = props;
  // event props
  let { onBlur, onChange, onFocus } = props;
  // state
  let { error } = state;

  // attributes for the Field
  let fieldAttrs = {
    // general
    description, error, hint,
    // css hooks
    descriptionClass, errorClass, hintClass
  };

  // attributes for the generated <input>
  let inputAttrs = {
    autofocus, checked, name, value, required, type: 'checkbox',
    onBlur, onFocus, class: controlClass
  };

  return (
    <Field class={[ 'CheckboxField', props.class ]} {...fieldAttrs}>
      <label class={labelClass}>
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

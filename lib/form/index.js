
/** @jsx dom */

import dom from 'magic-virtual-element';
import parse from 'form-parse';


/**
 * Available props
 */
export let propTypes = {
  /**
   * Toggle autocomplete on form.
   */
  autocomplete: { type: 'boolean' },

  /**
   * Adds custom CSS classes to the form.
   */
  class: { type: 'string' },

  /**
   * Passed as the `transformer` argument to dominicbarnes/form-serialize
   * @see https://github.com/dominicbarnes/form-serialize
   */
  transform: { type: 'function' },

  /**
   * Invoked once the form has passed validation and is able to be submitted.
   *
   * @param {Object} data
   * @param {HTMLFormElement} form
   */
  onSubmit: { type: 'function' }
};

/**
 * Renders a form with any children, which don't necessarilly have to be
 * components from this library.
 *
 * @param {Object} component
 * @return {VirtualNode}
 */
export function render({ props }) {
  let { children, transform, onSubmit, autocomplete } = props;

  return (
    <form autocomplete={autocomplete} class={[ 'Form', props.class ]} novalidate onSubmit={handle}>
      {children}
    </form>
  );

  /**
   * Take a form submission, validate it and give the data to a callback.
   *
   * @param {Event} e
   */
  function handle(e) {
    e.preventDefault(); // do not allow normal submission

    var form = e.target;
    if (form.checkValidity()) { // only when all validation is cleared
      var data = parse(form, transform);
      if (onSubmit) onSubmit(data, form);
    }
  }
}

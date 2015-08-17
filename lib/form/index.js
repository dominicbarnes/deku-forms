
/** @jsx dom */

/**
 * Dependencies.
 */
import dom from 'dekujs/virtual-element';
import serialize from 'dominicbarnes/form-serialize';


/**
 * Available props
 */
export let propTypes = {
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
 * @param {Object} component  Only props used currently.
 * @return {VirtualNode}
 */
export function render({ props }) {
  let { children, transform, onSubmit } = props;

  return <form class="Form" novalidate onSubmit={handle}>{children}</form>;

  /**
   * Take a form submission, validate it and give the data to a callback.
   *
   * @param {Event} e  The raw event object.
   */
  function handle(e) {
    e.preventDefault(); // do not allow normal submission

    var form = e.target;
    if (form.checkValidity()) { // only when all validation is cleared
      var data = serialize(form, transform);
      if (onSubmit) onSubmit(data, form);
    }
  }
}

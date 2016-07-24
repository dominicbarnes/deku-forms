
import element from 'magic-virtual-element';
import parse from 'form-parse';

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

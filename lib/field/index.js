
/** @jsx dom */

/**
 * Dependencies.
 */
import dom from 'dekujs/magic-virtual-element';
import marked from 'chjj/marked';


/**
 * Available props
 */
export let propTypes = {
  /**
   * Adds additional class names to the field container element.
   */
  class: { type: 'string' },

  /**
   * If the control(s) has an ID, adding the ID to the field gives some nice
   * UX for users. The ID here should point to the primary control. (if there
   * are multiple, probably choose the first one)
   */
  id: { type: 'string' },

  /**
   * Sets the (optional) label for this field. The label is displayed using
   * a `<label>` element, and is given the correct `for` attribute if an `id`
   * prop is specified.
   */
  label: { type: 'string' },

  /**
   * Sets the (optional) description for this field. The description is
   * displayed using a `<div>` element just below the label.
   */
  description: { type: 'string' },

  /**
   * Sets the (error) label for this field. This is displayed directly below
   * the controls. The text here supports markdown.
   */
  error: { type: 'string' },

  /**
   * Sets the (optional) hint for this field. The text is displayed at the end
   * of the field. The text here supports markdown.
   */
  hint: { type: 'string' }
};


/**
 * A wrapper for a given form field. Generally, there will be a single control,
 * but you could feasibly add multiple controls for specific situations.
 *
 * All children nodes will be added to the controls element.
 *
 * @param {Object} component
 * @return {VirtualNode}
 */
export function render({ props }) {
  var label = props.label
    ? <label class="FormField-label" for={props.id}>{props.label}</label>
    : null;

  var description = props.description
    ? <div class="FormField-description" innerHTML={marked(props.description)} />
    : null;

  var controls = <div class="FormField-controls">{props.children}</div>;

  var error = props.error
    ? <div class="FormField-error" innerHTML={marked(props.error)} />
    : null;

  var hint = props.hint
    ? <div class="FormField-hint" innerHTML={marked(props.hint)} />
    : null;

  var classes = {
    'FormField': true,
    'has-error': !!error
  };

  return (
    <div class={[ classes, props.class ]}>
      {label}
      {description}
      {controls}
      {error}
      {hint}
    </div>
  );
}

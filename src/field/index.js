
/** @jsx dom */

import dom from 'magic-virtual-element';
import Remarkable from 'remarkable';

const markdown = new Remarkable();

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
    ? <div class="FormField-description" innerHTML={markdown.render(props.description)} />
    : null;

  var controls = <div class="FormField-controls">{props.children}</div>;

  var error = props.error
    ? <div class="FormField-error" innerHTML={markdown.render(props.error)} />
    : null;

  var hint = props.hint
    ? <div class="FormField-hint" innerHTML={markdown.render(props.hint)} />
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

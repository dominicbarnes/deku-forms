
# TextField Component

> A component for generating a form field that is dedicated to textual data. In "multiline" mode,
> a `<textarea>` is used instead of the normal `<input type="text">`.


## Examples

```html
<TextField name="name" label="Full Name" />
<TextField name="bio" label="Bio" multiline />
```


## Attributes

These attributes are applied directly to the `<input>`/`<textarea>` and are used by it directly.
These are standard HTML attributes, so refer to official documentation there:

 * `disabled`
 * `name`
 * `placeholder`
 * `readonly`
 * `size`
 * `value`

### autofocus

Since `autofocus` is used by the browser to focus a field onload, it doesn't
really work the same in the context of something like deku. Thus, this prop
uses `afterMount` to manually focus the input after being added to the DOM.

### multiline

When this attribute is set, the control will be a `<textarea>`. (by default, a plain `<input>`
is used)

### Validation

These attributes are applied directly to the `<input>`/`<textare>` and are used for validation.
These are standard HTML5 attributes, so refer to official documentation there:

 * `maxlength`
 * `minlength`
 * `pattern` *(not supported by multiline)*
 * `required`

### validate

When this flag is set, validation messages will be displayed after every input/change event.
By default, this will not start happening until the first `invalid` event is fired, which
usually comes from a form submission attempt.

### error

When doing some advanced asynchronous validation, you can use this prop to set that custom
message. Doing so will preempt any native validation. (but it will continue to prevent the
form from being submitted)

### validationMessage(validity, el)

This method is used for customizing the validation/error message. `validity` is a
[`ValidityState`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) object. This
can be used to generate a custom message without needing to re-implement validation that is
already supported in HTML5.

```js
function validationMessage(validity, el) {
  if (validity.valueMissing) return 'Please enter your email address.';
  if (validity.typeMismatch) return 'Please enter a valid email address.';
  return el.validationMessage; // it's a good idea to fall back on this value
}
```

Check out the main README for more information about form validation.

### Field

These attributes are used directly by the [`Field`](../field) component:

 * `class`
 * `hint`
 * `id`
 * `label`
 * `description`

### Events

These events are triggered by the `<input>` directly. These are standard HTML events,
so refer to official documentation there:

 * `onBlur(e)`
 * `onChange(e)`
 * `onFocus(e)`
 * `onInput(e)`


## CSS Hooks

| Class | Description |
| ----- | ------- |
| `TextField` | Applied to the container `<div>`. |

Check the [`Field`](../field) component for additional hooks.

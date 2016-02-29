
# InputField Component

> A simple wrapper around creating a field for a single `<input>` element.
> Supports most of the HTML5 input types, as well as their validation attributes.


## Examples

```html
<InputField name="name" label="Full Name" />
<InputField name="email" type="email" label="Email" />
<InputField name="password" type="password" label="Password" />
<InputField name="confirm_password" type="password" label="Confirm Password" />
```


## Attributes

These attributes are applied directly to the `<input>` and are used by it directly. These
are standard HTML attributes, so refer to official documentation there:

 * `disabled`
 * `name`
 * `placeholder`
 * `readonly`
 * `size`
 * `type`
 * `value`

### Validation

These attributes are applied directly to the `<input>` and are used for validation. These
are standard HTML5 attributes, so refer to official documentation there:

 * `max`
 * `min`
 * `maxlength`
 * `minlength`
 * `pattern`
 * `required`
 * `step`

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
| `InputField` | Applied to the container `<div>`. |

Check the [`Field`](../field) component for additional hooks.

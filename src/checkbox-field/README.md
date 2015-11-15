
# CheckboxField Component

> A simple wrapper around a single checkbox for a field, usually for things like:
> "Do you agree to the terms and service?"


## Examples

```html
<CheckboxField name="agree" label="Do you agree?" required />
```


## Attributes

These attributes are applied directly to the `<input>` and are used by it directly. These
are standard HTML attributes, so refer to official documentation there:

 * `checked`
 * `name`
 * `value`

### Validation

These attributes are applied directly to the `<input>` and are used for validation. These
are standard HTML5 attributes, so refer to official documentation there:

 * `required`

### validationMessage(validity, el)

This method is used for customizing the validation/error message. `validity` is a
[`ValidityState`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) object. This
can be used to generate a custom message without needing to re-implement validation that is
already supported in HTML5.

```js
function validationMessage(validity, el) {
  if (validity.valueMissing) return 'Please agree to our terms. Resistance is futile.';
  return el.validationMessage; // it's a good idea to fall back on this value
}
```

Check out the main README for more information about form validation.

### Field

These attributes are used directly by the [`Field`](../field) component:

 * `class`
 * `hint`
 * `label`

### Events

These events are triggered by the `<input>` directly. These are standard HTML events,
so refer to official documentation there:

 * `onChange(e)`


## CSS Hooks

| Class | Description |
| ----- | ------- |
| `CheckboxField` | Applied to the container `<div>`. |

Check the [`Field`](../field) component for additional hooks.

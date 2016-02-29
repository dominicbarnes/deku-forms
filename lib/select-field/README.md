
# SelectField Component

> A component for generating a form field that for working with a `<select>` (aka: dropdown)


## Examples

```html
<SelectField name="color" label="Favorite Color"
  options={[ 'red', 'green', 'blue' ]} value="green" />
```


## Attributes

These attributes are passed directly to the [Select](../select) component:

 * `disabled`
 * `id`
 * `name`
 * `options`
 * `placeholder`
 * `size`
 * `value`

### Validation

These attributes are applied directly to the `<input>`/`<textare>` and are used for validation.
These are standard HTML5 attributes, so refer to official documentation there:

 * `required`

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
  if (validity.valueMissing) return 'Please choose a favorite color.';
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


## CSS Hooks

| Class | Description |
| ----- | ------- |
| `SelectField` | Applied to the container `<div>`. |

Check the [`Field`](../field) component for additional hooks.


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

### autofocus

Since `autofocus` is used by the browser to focus a field onload, it doesn't
really work the same in the context of something like deku. Thus, this prop
uses `afterMount` to manually focus the input after being added to the DOM.

### label

Rather than delegating the label to the underlying `Field` component, this attribute is used
to generate a `<label>` that wraps around the checkbox for better UX.

### labelClass

Adds additional class names to the label container element. This supports any inputs that
the [classnames](https://www.npmjs.com/package/classnames) module supports.

### controlClass

Adds additional class names to the input/textarea element. This supports any inputs that
the [classnames](https://www.npmjs.com/package/classnames) module supports.

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
 * `description`
 * `hintClass`
 * `descriptionClass`
 * `errorClass`

### Events

These events are triggered by the `<input>` directly. These are standard HTML events,
so refer to official documentation there:

 * `onBlur(e)`
 * `onChange(e)`
 * `onFocus(e)`


## CSS Hooks

| Class | Description |
| ----- | ------- |
| `CheckboxField` | Applied to the container `<div>`. |

Check the [`Field`](../field) component for additional hooks.

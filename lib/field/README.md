
# Field Component

> The primary container for a single control for accepting user input.
> This is to be used when writing custom fields.


## Example

```html
<Field id="email" label="Email" hint="Enter your real email address.">
  <input name="email" id="email" type="email" />
</Field>
```


## Attributes

### label

Adds a label for your field, which is displayed first and right above the controls.

### id

Use in conjunction with a label to make sure your forms have great UX. This allows screen
readers to connect a label with a given input, in addition you can click on the label and it
will bring focus to the right input.

### error

This is largely an internal property that a given custom field will set as part of it's state.
See the `InputField` for an example of how this works in practice.

**NOTE:** this attribute will be rendered using markdown, so keep that in mind when styling.
(there will be a `<p>` wrapping around the message)

### hint

Shows some helpful information to the user about the field. This is displayed below the
control(s), event after the `error`.

**NOTE:** this attribute will be rendered using markdown, so keep that in mind when styling.
(there will be a `<p>` wrapping around the message)


## CSS Hooks

| Class | Description |
| ----- | ------- |
| `FormField` | Applied to the container `<div>`. |
| `FormField-label` | Applied to the `<label>`. |
| `FormField-controls` | Applied to the `<div>` that wraps the control(s). |
| `FormField-error` | Applied to the `<div>` that wraps the error message. |
| `FormField-hint` | Applied to the `<div>` that wraps the hint. |


# Field Component

> The primary container for a single control for accepting user input.
> This is to be used when writing custom fields.


## Example

```html
<Field class="EmailField" id="email" label="Email" hint="Enter your real email address.">
  <input name="email" id="email" type="email" />
</Field>
```


## Attributes

### class

Adds additional class names to the field container element. This supports any inputs that
the [classnames](https://www.npmjs.com/package/classnames) module supports.

### label

Adds a label for your field, which is displayed first and above the controls.

### labelClass

Adds additional class names to the label container element. This supports any inputs that
the [classnames](https://www.npmjs.com/package/classnames) module supports.

### description

Adds a description for your field, which is displayed below the label and above the controls.

### descriptionClass

Adds additional class names to the description container element. This supports any inputs that
the [classnames](https://www.npmjs.com/package/classnames) module supports.

### id

Use in conjunction with a label to make sure your forms have great UX. This allows screen
readers to connect a label with a given input, in addition you can click on the label and it
will bring focus to the right input.

### error

This is largely an internal property that a given custom field will set as part of it's state.
See the `InputField` for an example of how this works in practice.

**NOTE:** this attribute will be rendered using markdown, so keep that in mind when styling.
(there will be a `<p>` wrapping around the message)

### errorClass

Adds additional class names to the error container element. This supports any inputs that
the [classnames](https://www.npmjs.com/package/classnames) module supports.

### hint

Shows some helpful information to the user about the field. This is displayed below the
control(s), event after the `error`.

**NOTE:** this attribute will be rendered using markdown, so keep that in mind when styling.
(there will be a `<p>` wrapping around the message)

### hintClass

Adds additional class names to the hint container element. This supports any inputs that
the [classnames](https://www.npmjs.com/package/classnames) module supports.


## CSS Hooks

| Class | Description |
| ----- | ------- |
| `FormField` | Applied to the container `<div>`. |
| `has-error` | Applied to `.FormField` when there is an error being displayed |
| `FormField-label` | Applied to the `<label>`. |
| `FormField-description` | Applied to the `<div>` that wraps the description. |
| `FormField-controls` | Applied to the `<div>` that wraps the control(s). |
| `FormField-error` | Applied to the `<div>` that wraps the error message. |
| `FormField-hint` | Applied to the `<div>` that wraps the hint. |

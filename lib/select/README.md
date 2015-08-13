
# Select Component

> A component for generating a `<select>` control, with helpers for automatically selecting
> the correct `<option>` based on the `value` attribute.


## Examples

```html
<Select name="color" options={[ 'red', 'green', 'blue' ]} value="green" />
```


## Attributes

These attributes are applied directly to the `<select>` and are used by it directly.
These are standard HTML attributes, so refer to official documentation there:

 * `disabled`
 * `id`
 * `name`
 * `size`

### value

Sets the selected option based on it's own `value` attribute.

In other words, it does *not* match based on the label, unless you are using the simple array,
which uses the same value for both the label *and* the value.

### Validation

These attributes are applied directly to the `<input>`/`<textare>` and are used for validation.
These are standard HTML5 attributes, so refer to official documentation there:

 * `required`

### Events

These events are triggered by the `<input>` directly. These are standard HTML events,
so refer to official documentation there:

 * `onChange(e)`


## CSS Hooks

There are currently no hooks here. You will likely use something like `.Form select` to target
these elements.

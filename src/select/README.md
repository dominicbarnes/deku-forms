
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

### options

Determines the list of `<option>` elements that give the user the options they choose from.

This can be a simple array of strings, which means the same string will be used as both the
`value` **and** the `label`.

```js
[ 'red', 'green', 'blue' ]
```

The most flexible option is to use an array of objects: (each object should have both a `label`
and `value` property)

```js
[
  { label: 'red', value: '#ff0000' },
  { label: 'green', value: '#00ff00' },
  { label: 'blue', value: '#0000ff' }
]
```

### value

When passed, this will be compared with the `options` to determine which element should be marked
as `selected`. (must pass a strict comparison)

### placeholder

Since the `<select>` element does not support the `placeholder` attribute, this one behaves a
little differently. When used, this prepends an `<option>` to the list of options that will
have an empty `value`, but uses the placeholder text as the `label`.

This has the effect of acting like a placeholder where no value has previously been selected.
(otherwise, the first `<option>` is selected by default)

### class

Adds additional class names to the select element. This supports any inputs that
the [classnames](https://www.npmjs.com/package/classnames) module supports.

### Validation

These attributes are applied directly to the `<input>`/`<textare>` and are used for validation.
These are standard HTML5 attributes, so refer to official documentation there:

 * `required`

### Events

These events are triggered by the `<input>` directly. These are standard HTML events,
so refer to official documentation there:

 * `onBlur(e)`
 * `onChange(e)`
 * `onFocus(e)`


## CSS Hooks

There are currently no hooks here. You will likely use something like `.Form select` to target
these elements.

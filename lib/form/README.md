
# Form Component

> The primary container for working with forms, this represents a `<form>` element directly.


## Example

```html
<Form onSubmit={handle}>
  <InputField name="username" label="Username" />
  <InputField name="password" type="password" label="Password" />
  <button type="submit">Submit</button>
</Form>
```


## Attributes

### onSubmit(data, form)

Used to handle the form submission by the user. This handler is only invoked once the form's
validation has passed. The serialized form `data` and the raw `form` element are given as
arguments.

The big idea is that you assign `name` attributes based on what you want your final `data` object
to look like. (complex structures are supported, check out the
[documentation](https://github.com/dominicbarnes/form-serialize) for more details)

### transform(name, value, el)

This is passed to the serializer, it can be used to parse strings into numbers and much more.
Check out the [documentation](https://github.com/dominicbarnes/form-serialize) for more details.


## CSS Hooks

So far, this is a pretty short list, but it'll likely be expanded upon in the future.

| Class | Description |
| ----- | ------- |
| `Form` | Applied directly to the `<form>` element. |

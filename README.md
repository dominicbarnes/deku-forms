# deku-form

> A collection of [deku](https://github.com/dekujs/deku) components for
> working with forms

## Usage

```js
import { Form, InputField } from 'dominicbarnes/deku-forms';

export function render() {
  return (
    <Form onSubmit={handle}>
      <InputField name="username"
        label="Username"
        required />

      <InputField name="password"
        type="password"
        label="Password"
        minlength="8"
        required />

      <button type="submit">Submit</button>
    </Form>
  );

  function handle(data, form) {
    // data: serialized form data
    // form: raw form element
    console.log(data);
  }
}
```

## Components

 - [Form](lib/form)
 - [Field](lib/field)
 - [InputField](lib/input-field)
 - [TextField](lib/text-field)

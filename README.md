# deku-form

> A collection of [deku](https://github.com/dekujs/deku) components for working with forms.
> While I consider much of the API stable, it could change after real-world usage.
> Generally-speaking, I forsee more additions than changes.

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

### Core

 - [Form](lib/form)
 - [Field](lib/field)
 - [Select](lib/select)

### Field Types

 - [CheckboxField](lib/checkbox-field)
 - [InputField](lib/input-field)
 - [TextField](lib/text-field)
 - [SelectField](lib/select-field)


## Validation

This component leverages [HTML5 Constraint Validation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms_in_HTML#Constraint_Validation)
heavily. This is a much simpler model than re-implementing this validation in some sort of library,
while also allowing a great deal of customized validation.

I recommend reading through [this documentation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/Data_form_validation),
it will be a great primer on the fundamentals of this validation system.

### Custom Validation Messages

All of the `*Field` components here have a `validationMessage(validity, el)` prop. You can set
a function here to customize the error message you display to your user. The `validity` argument is a
[`ValidityState`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) object, while the
`el` argument is the corresponding control element. The default for this function is:

```js
function validationMessage(validity, el) {
  return el.validationMessage;
}
```

This doesn't account for `validity` at all, as the `el.validationMessage` is populated by the browser
with a message that is generally useful.

### Custom Validation Rules

To do custom validation, you will hook into normal events like `input` and `change`, from there
you call `el.setCustomValidity(message)` to mark a field as invalid with the corresponding message.
(simply call that same method with an empty string to mark it as valid again)

### Async Validation

Currently, async validation is not built in to this approach. However, the best approach for the
time-being is to simply disable your form's submit button if you have some async action in-flight.
Once that action is complete, you can re-enable the submit button.

It's not perfect, but it's pretty flexible, and not hard to accomplish with deku.

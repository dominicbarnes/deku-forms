# deku-forms

> A collection of [deku](https://github.com/dekujs/deku) components for working with forms.
> While I consider much of the API stable, it could change after real-world usage.
> Generally-speaking, I forsee more additions than changes.

[![npm version](https://img.shields.io/npm/v/deku-forms.svg)](https://www.npmjs.com/package/deku-forms)
[![npm dependencies](https://img.shields.io/david/dominicbarnes/deku-forms.svg)](https://david-dm.org/dominicbarnes/deku-forms)
[![npm dev dependencies](https://img.shields.io/david/dev/dominicbarnes/deku-forms.svg)](https://david-dm.org/dominicbarnes/deku-forms#info=devDependencies)
[![build status](https://img.shields.io/travis/dominicbarnes/deku-forms.svg)](https://travis-ci.org/dominicbarnes/deku-forms)

**NOTE:** As of `1.x`, I have switched this module over to using mako for builds instead of
component and duo. The `0.x` releases are still compatible with duo/component as they were
before.

## Usage

```js
import { Form, InputField } from 'deku-forms';

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
 - [FormField](lib/field)
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

### User Interface

Validation errors are *generally* only presented to the user after their first submission attempt.
Internally, this means the `invalid` event has been triggered. There are 2 primary ways to force
validation on every input/change event, regardless of submission status:

 - add the `validate` attribute (**preferred**)
 - when doing custom validation, call `el.checkValidity()` manually

**NOTE:** these methods only apply to the `InputField` and `TextField` components as of now.
(since the other components don't make much sense with auto-validation)

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

To accomplish async validation, you can use the `error` attribute that is available on most of the
field types. Hook into the `change` or `input` events and then you can use state within your form to
transfer this error into your field.

This approach isn't perfect, but it's pretty good and doesn't require you to know anything about
the HTML5 Constraint Validation API. (unlike previously)


import element from 'virtual-element';
import control from 'form-control';
import { CheckboxField, Form, InputField, TextField } from '../src';

/**
 * A simple render function that returns an example form.
 *
 * @return {Virtual}
 */
export default function () {
  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        onInput={validateName}
        required />
      <InputField
        label="Password"
        name="password"
        required
        type="password" />
      <InputField
        label="Confirm Password"
        onInput={validatePassword}
        required
        type="password" />
      <CheckboxField
        label="I agree to the terms and conditions"
        name="agree"
        required />
      <button type="submit">Submit</button>
    </Form>
  );

  function validateName(e) {
    const valid = e.target.value.indexOf(' ') > -1;
    e.target.setCustomValidity(valid ? '' : 'fail');
  }

  /**
   * A handler for the submit event, it simply logs the submitted data to the
   * console.
   *
   * @param {Object} data  The serialized data from the form.
   */
  function handleSubmit(data) {
    console.log('submitted', data);
  }

  /**
   * A handler for checking that the "confirm password" field matches the
   * "password" field.
   *
   * @param {Event} e  The `input` event.
   */
  function validatePassword(e) {
    const confirm = e.target;
    if (!confirm.value) return;

    const password = control(confirm.form, 'password');
    confirm.setCustomValidity(password.value !== confirm.value ? 'Passwords must match.' : '');
    confirm.checkValidity();
  }
}

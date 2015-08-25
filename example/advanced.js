
/** @jsx dom */

import dom from 'dekujs/virtual-element';
import { Form, InputField } from '../lib';

export function render({ props, state }, setState) {
  let { onSubmit } = props;
  let { usernameError } = state;

  return (
    <Form onSubmit={onSubmit}>
      <h1>Advanced Example</h1>
      <p>
        This form uses asynchronous validation, making it a more
        advanced example.
      </p>

      <InputField
        error={usernameError}
        hint="Try 'testuser' for async validation failure."
        label="Username"
        name="username"
        onInput={validateLogin}
        required />

      <InputField
        label="Password"
        minlength="8"
        name="password"
        required
        type="password" />

      <button type="submit">Submit</button>
    </Form>
  );

  function validateLogin(e) {
    let input = e.target;
    let username = input.value;

    setTimeout(() => {
      let msg = username === 'testuser' ? 'Username already taken.' : '';
      setState({ usernameError: msg });
    }, 250);
  }
}

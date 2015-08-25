
/** @jsx dom */

import dom from 'dekujs/virtual-element';
import { Form, InputField, TextField, SelectField } from '../lib';

export function render({ props }) {
  return (
    <Form onSubmit={props.onSubmit}>
      <h1>Simple Example</h1>
      <p>
        This example showcases the main field types, only using basic options.
      </p>

      <TextField
        label="Full Name"
        name="name"
        required />

      <InputField
        label="Password"
        minlength="8"
        name="password"
        required
        type="password" />

      <InputField
        label="Email Address"
        required
        type="email" />

      <SelectField
        label="Favorite Color"
        name="favorite[color]"
        options={[ 'red', 'blue', 'green' ]} />

      <button type="submit">Submit</button>
    </Form>
  );
}

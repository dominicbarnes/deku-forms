
/** @jsx dom */
/* eslint-disable no-console */

import dom from 'dekujs/virtual-element';
import { render, tree } from 'dekujs/deku';
import { Form, InputField, TextField, SelectField } from '../lib';


let app = tree(
  <Form onSubmit={handle}>
    <h1>Create an Account</h1>

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

    <InputField
      label="Favorite Number"
      name="favorite[number]"
      onInput={ensureSeven}
      type="number" />

    <button type="submit">Submit</button>
  </Form>
);
render(app, document.body);


function handle(data) {
  console.info('successful submission', data);
}

function ensureSeven(e) {
  let input = e.target;
  let value = parseInt(input.value, 10);
  input.setCustomValidity(value === 7 ? '' : 'Only 7 is an acceptable value.');
}

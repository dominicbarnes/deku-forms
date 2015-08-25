
/** @jsx dom */
/* eslint-disable no-console */

import dom from 'dekujs/virtual-element';
import { render, tree } from 'dekujs/deku';
import * as SimpleForm from './simple';
import * as AdvancedForm from './advanced';

let app = tree(
  <main>
    <SimpleForm onSubmit={handle} />
    <AdvancedForm onSubmit={handle} />
  </main>
);
render(app, document.body);


function handle(data) {
  console.info('successful submission', data);
}

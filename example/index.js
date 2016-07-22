
import { tree, render } from 'deku';
import element from 'virtual-element';
import Form from './form';

const app = tree(<Form />);
render(app, document.querySelector('main'));

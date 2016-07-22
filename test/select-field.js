
/** @jsx dom */

import each from 'for-each';
import trigger from 'compat-trigger-event';
import dom from 'virtual-element';
import assert from './assertions';
import Mock from 'component-mock';
import { delay, mount, validationMessage } from './util';
import { FormField, Select, SelectField } from '../src';

describe('SelectField', function () {
  let mock = Mock(SelectField);

  it('should return a FormField component', function () {
    let node = mock.render();
    assert.node.isNode(node, FormField);
    assert.node.hasClass(node, 'SelectField');
  });

  it('should have a Select component as the control', function () {
    let node = mock.render();
    let input = node.children[0];
    assert.node.isNode(input, Select);
  });

  describe('with props', function () {
    let selectAttrs = {
      autofocus: true,
      disabled: true,
      name: 'test',
      placeholder: 'test',
      required: true,
      size: 2,
      value: 'hello world'
    };

    each(selectAttrs, function (value, attr) {
      describe(`.${attr}`, function () {
        it('should add the attribute to the Select', function () {
          let props = { [attr]: value };
          let node = mock.render({ props });
          let select = node.children[0];
          assert.node.hasAttribute(select, attr, value);
        });
      });
    });

    describe('.class', function () {
      it('should add the custom class', function () {
        let props = { class: 'MyField' };
        let node = mock.render({ props });
        assert.node.hasClass(node, 'MyField');
      });
    });

    describe('.options', function () {
      it('should add the options to the Select', function () {
        let props = { options: [ 'a', 'b' ] };
        let node = mock.render({ props });
        let select = node.children[0];
        assert.node.hasAttribute(select, 'options', function (value) {
          assert.deepEqual(props.options, value);
        });
      });
    });

    let fieldAttrs = {
      hint: 'a',
      label: 'b',
      description: 'c'
    };

    each(fieldAttrs, function (value, attr) {
      describe(`.${attr}`, function () {
        it('should add the attribute to the Field', function () {
          let props = { [attr]: value };
          let node = mock.render({ props });
          assert.node.hasAttribute(node, attr, value);
        });
      });
    });

    describe('.id', function () {
      it('should add the id to the input', function () {
        let props = { id: 'test' };
        let node = mock.render({ props });
        let input = node.children[0];
        assert.node.hasAttribute(input, 'id', 'test');
      });

      it('should add the id to the Field', function () {
        let props = { id: 'test' };
        let node = mock.render({ props });
        assert.node.hasAttribute(node, 'id', 'test');
      });
    });

    describe('.onBlur(e)', function () {
      it('should fire the event handler', function (done) {
        let app = mount(<SelectField onBlur={handle} />);

        function handle(e) {
          assert.strictEqual(e.type, 'blur');
          app.unmount();
          done();
        }

        trigger(app.element.querySelector('select'), 'blur');
      });
    });

    describe('.onChange(e)', function () {
      it('should fire the event handler', function (done) {
        let app = mount(<SelectField onChange={handle} />);

        function handle(e) {
          assert.strictEqual(e.type, 'change');
          app.unmount();
          done();
        }

        trigger(app.element.querySelector('select'), 'change');
      });
    });

    describe('.onFocus(e)', function () {
      it('should fire the event handler', function (done) {
        let app = mount(<SelectField onFocus={handle} />);

        function handle(e) {
          assert.strictEqual(e.type, 'focus');
          app.unmount();
          done();
        }

        trigger(app.element.querySelector('select'), 'focus');
      });
    });
  });

  describe('with state', function () {
    describe('.error', function () {
      it('should add the error to the Field', function () {
        let state = { error: 'test' };
        let node = mock.render({ state });
        assert.node.hasAttribute(node, 'error', 'test');
      });
    });
  });

  describe('interaction', function () {
    this.slow(500);

    it('should add validation error messages to the Field', function (done) {
      let app = mount(<SelectField name="name" required validationMessage={validationMessage} />);
      let select = app.element.querySelector('select');

      trigger(select, 'change'); // still empty, will fail validation
      delay(function () {
        assert(app.element.querySelector('.FormField-error'));
        app.unmount();
        done();
      }); // run after current stack so error handler has fired
    });

    it('should remove the error messages after being corrected', function (done) {
      let app = mount(<SelectField name="name" options={[ '', 'a', 'b' ]} required validationMessage={validationMessage} />);
      let select = app.element.querySelector('select');

      trigger(select, 'change'); // still empty, will fail validation
      delay(function () {
        select.selectedIndex = 1;
        trigger(select, 'change'); // now filled, will pass

        delay(function () {
          assert(!app.element.querySelector('.FormField-error'));
          app.unmount();
          done();
        });
      }); // run after current stack so error handler has fired
    });

    it('should autofocus the select', function () {
      let app = mount(<SelectField autofocus />);
      let control = app.element.querySelector('select');
      assert.strictEqual(control, document.activeElement, `expected ${control.outerHTML} to have focus`);
      app.unmount();
    });
  });
});

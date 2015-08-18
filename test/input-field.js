
/** @jsx dom */

import each from 'component/each';
import nextTick from 'timoxley/next-tick';
import trigger from 'adamsanderson/trigger-event';
import dom from 'dekujs/virtual-element';
import assert from './assertions';
import { component, mount } from './util/component';
import { FormField, InputField } from '../lib';

describe('InputField', function () {
  let noop = () => {};

  it('should return a FormField component', function () {
    let node = InputField.render(component(), noop);
    assert.node.isNode(node, FormField);
    assert.node.hasClass(node, 'InputField');
  });

  it('should have a plain input as the control', function () {
    let node = InputField.render(component(), noop);
    let input = node.children[0];
    assert.node.isNode(input, 'input');
  });

  describe('with props', function () {
    let inputAttrs = {
      disabled: true,
      max: 50,
      maxlength: 50,
      min: 2,
      minlength: 2,
      name: 'test',
      pattern: '\d+',
      placeholder: 'test',
      readonly: true,
      required: true,
      size: 2,
      step: 2,
      type: 'number',
      value: 'hello world'
    };

    each(inputAttrs, function (attr, value) {
      describe(`.${attr}`, function () {
        it(`should add the attribute to the input`, function () {
          let props = { [attr]: value };
          let node = InputField.render(component({ props }), noop);
          let input = node.children[0];
          assert.node.hasAttribute(input, attr, value);
        });
      });
    });

    let fieldAttrs = {
      hint: 'a',
      label: 'b'
    };

    each(fieldAttrs, function (attr, value) {
      describe(`.${attr}`, function () {
        it(`should add the attribute to the Field`, function () {
          let props = { [attr]: value };
          let node = InputField.render(component({ props }), noop);
          assert.node.hasAttribute(node, attr, value);
        });
      });
    });

    describe('.id', function () {
      it('should add the id to the input', function () {
        let props = { id: 'test' };
        let node = InputField.render(component({ props }), noop);
        let input = node.children[0];
        assert.node.hasAttribute(input, 'id', 'test');
      });

      it('should add the id to the Field', function () {
        let props = { id: 'test' };
        let node = InputField.render(component({ props }), noop);
        assert.node.hasAttribute(node, 'id', 'test');
      });
    });

    describe('.onChange(e)', function () {
      it('should fire the event handler', function (done) {
        let app = mount(<InputField onChange={handle} />);

        function handle(e) {
          assert.strictEqual(e.type, 'change');
          app.unmount();
          done();
        }

        trigger(app.element.querySelector('input'), 'change');
      });
    });

    describe('.onInput(e)', function () {
      it('should fire the event handler', function (done) {
        let app = mount(<InputField onInput={handle} />);

        function handle(e) {
          assert.strictEqual(e.type, 'input');
          app.unmount();
          done();
        }

        trigger(app.element.querySelector('input'), 'input');
      });
    });
  });

  describe('with state', function () {
    describe('.error', function () {
      it('should add the error to the Field', function () {
        let state = { error: 'test' };
        let node = InputField.render(component({ state }), noop);
        assert.node.hasAttribute(node, 'error', 'test');
      });
    });
  });

  describe('interaction', function () {
    it('should add validation error messages to the Field', function (done) {
      let app = mount(<InputField name="name" required />);
      trigger(app.element.querySelector('input'), 'input'); // still empty, will fail validation

      nextTick(function () {
        assert(app.element.querySelector('.FormField-error'));
        app.unmount();
        done();
      }); // run after current stack so error handler has fired
    });

    it('should remove the error messages after being corrected', function (done) {
      let app = mount(<InputField name="name" required />);
      let input = app.element.querySelector('input');

      trigger(input, 'input'); // still empty, will fail validation
      nextTick(function () {
        input.value = 'hello world';
        trigger(input, 'input'); // now filled, will pass

        nextTick(function () {
          assert(!app.element.querySelector('.FormField-error'));
          app.unmount();
          done();
        });
      }); // run after current stack so error handler has fired
    });
  });
});

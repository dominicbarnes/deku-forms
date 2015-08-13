
import each from 'component/each';
import empty from 'yields/empty';
import trigger from 'adamsanderson/trigger-event';
import dom from 'dekujs/virtual-element';
import { render, tree } from 'dekujs/deku';
import component from './util/component';
import assert from './assertions';
import { Field, InputField } from '../lib';

describe('InputField', function () {
  let main = document.createElement('main');
  let noop = () => {};

  before(function () {
    document.body.appendChild(main);
  });

  afterEach(function () {
    empty(main);
  });

  after(function () {
    document.body.removeChild(main);
  });

  it('should return a Field component', function () {
    let node = InputField.render(component(), noop);
    assert.vnode.isElement(node, Field);
  });

  it('should have a plain input as the control', function () {
    let node = InputField.render(component(), noop);
    let input = node.children[0];
    assert.vnode.isElement(input, 'input');
  });

  describe('with props', function () {
    let inputAttrs = {
      disabled: true,
      max: 10,
      maxlength: 10,
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
          assert.vnode.hasAttribute(input, attr, value);
        });
      });
    });

    let fieldAttrs = {
      hint: 'a',
      label: 'b'
    };

    each(fieldAttrs, function (attr, value) {
      describe(`.${attr}`, function () {
        it(`should add the attribute to the input`, function () {
          let props = { [attr]: value };
          let node = InputField.render(component({ props }), noop);
          assert.vnode.hasAttribute(node, attr, value);
        });
      });
    });

    describe('.id', function () {
      it('should add the id to the input', function () {
        let props = { id: 'test' };
        let node = InputField.render(component({ props }), noop);
        let input = node.children[0];
        assert.vnode.hasAttribute(input, 'id', 'test');
      });

      it('should add the id to the Field', function () {
        let props = { id: 'test' };
        let node = InputField.render(component({ props }), noop);
        assert.vnode.hasAttribute(node, 'id', 'test');
      });
    });

    describe('.onChange(e)', function () {
      it('should fire the onChange event handler', function (done) {
        let app = tree(<InputField onChange={handle} />);
        render(app, main);

        function handle(e) {
          assert.strictEqual(e.type, 'change');
          app.unmount();
          done();
        }

        trigger(main.querySelector('input'), 'change');
      });
    });

    describe('.onInput(e)', function () {
      it('should fire the onChange event handler', function (done) {
        let app = tree(<InputField onInput={handle} />);
        render(app, main);

        function handle(e) {
          assert.strictEqual(e.type, 'input');
          app.unmount();
          setTimeout(done, 10);
        }

        trigger(main.querySelector('input'), 'input');
      });
    });
  });

  describe('with state', function () {
    describe('.error', function () {
      it('should add the error to the Field', function () {
        let state = { error: 'test' };
        let node = InputField.render(component({ state }), noop);
        assert.vnode.hasAttribute(node, 'error', 'test');
      });
    });
  });

  describe('interaction', function () {
    it('should add validation error messages to the Field', function (done) {
      let app = tree(<InputField name="name" required />);
      render(app, main);

      trigger(main.querySelector('input'), 'input'); // still empty, will fail validation
      setTimeout(function () {
        assert(main.querySelector('.FormField-error'));
        app.unmount();
        setTimeout(done, 10);
      }, 10); // run after current stack so error handler has fired
    });

    it('should remove the error messages after being corrected', function (done) {
      let app = tree(<InputField name="name" required />);
      render(app, main);
      let input = main.querySelector('input');

      trigger(input, 'input'); // still empty, will fail validation
      setTimeout(function () {
        input.value = 'hello world';
        trigger(input, 'input'); // now filled, will pass

        setTimeout(function () {
          assert(!main.querySelector('.FormField-error'));
          app.unmount();
          setTimeout(done, 10);
        }, 10);
      }, 10); // run after current stack so error handler has fired
    });
  });
});

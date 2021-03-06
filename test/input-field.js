
import each from 'for-each';
import trigger from 'compat-trigger-event';
import element from 'virtual-element';
import assert from './assertions';
import Mock from 'component-mock';
import { delay, mount, validationMessage } from './util';
import { Form, FormField, InputField } from '../src';

describe('InputField', function () {
  let mock = Mock(InputField);

  it('should return a FormField component', function () {
    let node = mock.render();
    assert.node.isNode(node, FormField);
    assert.node.hasClass(node, 'InputField');
  });

  it('should have a plain input as the control', function () {
    let node = mock.render();
    let input = node.children[0];
    assert.node.isNode(input, 'input');
  });

  it('should generate an id when one is not specified', function () {
    let node = mock.render();
    let input = node.children[0];
    assert.node.hasAttribute(input, 'id');
  });

  describe('with props', function () {
    let inputAttrs = {
      accept: 'image/*',
      autofocus: true,
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

    each(inputAttrs, function (value, attr) {
      describe(`.${attr}`, function () {
        it('should add the attribute to the input', function () {
          let props = { [attr]: value };
          let node = mock.render({ props });
          let input = node.children[0];
          assert.node.hasAttribute(input, attr, value);
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

    describe('.controlClass', function () {
      it('should add the custom class to the input', function () {
        let props = { controlClass: 'a' };
        let node = mock.render({ props });
        assert.node.hasClass(node.children[0], 'a');
      });
    });

    let fieldAttrs = {
      hint: 'a',
      label: 'b',
      description: 'c',
      error: 'd',
      hintClass: 'e',
      labelClass: 'f',
      descriptionClass: 'g',
      errorClass: 'h'
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

    describe('.onBlur(e)', function () {
      it('should fire the event handler', function (done) {
        let app = mount(<InputField onBlur={handle} />);

        function handle(e) {
          assert.strictEqual(e.type, 'blur');
          app.unmount();
          done();
        }

        trigger(app.element.querySelector('input'), 'blur');
      });
    });

    describe('.onFocus(e)', function () {
      it('should fire the event handler', function (done) {
        let app = mount(<InputField onFocus={handle} />);

        function handle(e) {
          assert.strictEqual(e.type, 'focus');
          app.unmount();
          done();
        }

        trigger(app.element.querySelector('input'), 'focus');
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
        let node = mock.render({ state });
        assert.node.hasAttribute(node, 'error', 'test');
      });
    });
  });

  describe('interaction', function () {
    this.slow(500);

    it('should not validate until after the first invalid event', function (done) {
      let app = mount(<InputField name="name" required validationMessage={validationMessage} />);
      let input = app.element.querySelector('input');
      trigger(input, 'input'); // empty, will fail validation (but not be shown in UI)

      delay(function () {
        assert(!app.element.querySelector('.FormField-error'));
        input.checkValidity();

        delay(function () {
          assert(app.element.querySelector('.FormField-error'));
          app.unmount();
          done();
        });
      }); // run after current stack so error handler has fired
    });

    it('should validate automatically with the validate attribute', function (done) {
      let app = mount(<InputField name="name" required validate validationMessage={validationMessage} />);
      let input = app.element.querySelector('input');
      trigger(input, 'input'); // still empty, will fail validation

      delay(function () {
        assert(app.element.querySelector('.FormField-error'));
        app.unmount();
        done();
      }); // run after current stack so error handler has fired
    });

    it('should add validation error messages to the Field', function (done) {
      let app = mount(<InputField name="name" required validationMessage={validationMessage} />);
      let input = app.element.querySelector('input');
      input.checkValidity(); // still empty, will fail validation

      delay(function () {
        assert(app.element.querySelector('.FormField-error'));
        app.unmount();
        done();
      }); // run after current stack so error handler has fired
    });

    it('should remove the error messages after being corrected', function (done) {
      let app = mount(<InputField name="name" required validationMessage={validationMessage} />);
      let input = app.element.querySelector('input');
      input.checkValidity(); // still empty, will fail validation

      delay(function () {
        input.value = 'hello world';
        trigger(input, 'input'); // now filled, will pass

        delay(function () {
          assert(!app.element.querySelector('.FormField-error'));
          app.unmount();
          done();
        });
      }); // run after current stack so error handler has fired
    });

    it('should add custom validation error messages to the Field', function (done) {
      let app = mount(<InputField name="name" />);
      let input = app.element.querySelector('input');
      input.setCustomValidity('fail');
      input.checkValidity();

      delay(function () {
        assert(app.element.querySelector('.FormField-error'));
        app.unmount();
        done();
      }); // run after current stack so error handler has fired
    });

    it('should preserve custom validation even re-renders occur', function (done) {
      let app = mount(
        <Form>
          <InputField name="name" />
          <button type="submit" />
        </Form>
      );
      let input = app.element.querySelector('input');
      let button = app.element.querySelector('button');
      input.setCustomValidity('fail');
      input.checkValidity();

      delay(function () {
        assert(app.element.querySelector('.FormField-error'));
        trigger(button, 'click');

        delay(function () {
          trigger(input, 'input');

          delay(function () {
            assert(app.element.querySelector('.FormField-error'));
            app.unmount();
            done();
          });
        });
      });
    });

    it('should remove custom error messages after being corrected', function (done) {
      let app = mount(<InputField name="name" onChange={onChange} validationMessage={validationMessage} />);
      let input = app.element.querySelector('input');
      let x = 0;

      function onChange(e) {
        e.target.setCustomValidity(++x > 1 ? '' : 'failure');
        e.target.checkValidity();
      }

      trigger(input, 'change'); // will fail validation on first change
      delay(function () {
        trigger(input, 'change'); // now pass on all subsequent changes

        delay(function () {
          assert(!app.element.querySelector('.FormField-error'));
          app.unmount();
          done();
        }); // wait for change event to trigger state change
      }); // run after current stack so error handler has fired
    });

    it('should autofocus the input', function () {
      let app = mount(<InputField autofocus name="name" />);
      let control = app.element.querySelector('input');
      assert.strictEqual(control, document.activeElement, `expected ${control.outerHTML} to have focus`);
      app.unmount();
    });
  });
});


/** @jsx dom */

import each from 'for-each';
import trigger from 'compat-trigger-event';
import dom from 'virtual-element';
import assert from './assertions';
import Mock from 'component-mock';
import { delay, mount, validationMessage } from './util';
import { FormField, TextField } from '../src';

describe('TextField', function () {
  let mock = Mock(TextField);

  it('should return a FormField component', function () {
    let node = mock.render();
    assert.node.isNode(node, FormField);
    assert.node.hasClass(node, 'TextField');
  });

  it('should have a plain input as the control', function () {
    let node = mock.render();
    let input = node.children[0];
    assert.node.isNode(input, 'input');
  });

  describe('with props', function () {
    describe('.multiline', function () {
      it('should use a textarea instead of an input', function () {
        let props = { multiline: true };
        let node = mock.render({ props });
        let input = node.children[0];
        assert.node.isNode(input, 'textarea');
      });

      it('should put the value as the child of the textarea', function () {
        let props = { multiline: true, value: 'hello world' };
        let node = mock.render({ props });
        let input = node.children[0];
        assert.node.hasChildren(input, 'hello world');
      });
    });

    let inputAttrs = {
      autofocus: true,
      disabled: true,
      maxlength: 10,
      minlength: 2,
      name: 'test',
      pattern: '\d+',
      placeholder: 'test',
      readonly: true,
      required: true,
      size: 2,
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

    let textareaAttrs = {
      disabled: true,
      maxlength: 10,
      minlength: 2,
      name: 'test',
      placeholder: 'test',
      readonly: true,
      required: true
    };

    each(textareaAttrs, function (value, attr) {
      describe(`.${attr}`, function () {
        it('should add the attribute to the textarea', function () {
          let props = { [attr]: value };
          let node = mock.render({ props });
          let input = node.children[0];
          assert.node.hasAttribute(input, attr, value);
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

    describe('.onChange(e)', function () {
      it('should fire the event handler', function (done) {
        let app = mount(<TextField onChange={handle} />);

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
        let app = mount(<TextField onBlur={handle} />);

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
        let app = mount(<TextField onFocus={handle} />);

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
        let app = mount(<TextField onInput={handle} />);

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
      let app = mount(<TextField name="name" required validationMessage={validationMessage} />);
      let input = app.element.querySelector('input');
      trigger(input, 'input'); // will fail validation, but not shown in UI

      delay(function () {
        assert(!app.element.querySelector('.FormField-error'));
        input.checkValidity(); // will trigger invalid event, starting auto-validation

        delay(function () {
          assert(app.element.querySelector('.FormField-error'));
          app.unmount();
          done();
        });
      }); // run after current stack so error handler has fired
    });

    it('should validate automatically with the validate attribute', function (done) {
      let app = mount(<TextField name="name" required validate validationMessage={validationMessage} />);
      let input = app.element.querySelector('input');
      trigger(input, 'input'); // still empty, will fail validation

      delay(function () {
        assert(app.element.querySelector('.FormField-error'));
        app.unmount();
        done();
      }); // run after current stack so error handler has fired
    });

    it('should add validation error messages to the Field', function (done) {
      let app = mount(<TextField name="name" required validationMessage={validationMessage} />);
      let input = app.element.querySelector('input');
      input.checkValidity(); // start auto-validation

      delay(function () {
        assert(app.element.querySelector('.FormField-error'));
        app.unmount();
        done();
      }); // run after current stack so error handler has fired
    });

    it('should remove the error messages after being corrected', function (done) {
      let app = mount(<TextField name="name" required validationMessage={validationMessage} />);
      let input = app.element.querySelector('input');
      input.checkValidity('invalid'); // start auto-validation

      delay(function () {
        input.value = 'hello world';
        trigger(input, 'change'); // now filled, will pass

        delay(function () {
          assert(!app.element.querySelector('.FormField-error'));
          app.unmount();
          done();
        });
      }); // run after current stack so error handler has fired
    });

    it('should remove custom error messages after being corrected', function (done) {
      let app = mount(<TextField name="name" onChange={onChange} validationMessage={validationMessage} />);
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
      let app = mount(<TextField autofocus />);
      let control = app.element.querySelector('input');
      assert.strictEqual(control, document.activeElement, `expected ${control.outerHTML} to have focus`);
    });

    it('should autofocus the textarea', function () {
      let app = mount(<TextField autofocus multiline />);
      let control = app.element.querySelector('textarea');
      assert.strictEqual(control, document.activeElement, `expected ${control.outerHTML} to have focus`);
    });
  });
});

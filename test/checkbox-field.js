
/** @jsx dom */

import each from 'component/each';
import trigger from 'adamsanderson/trigger-event';
import dom from 'dekujs/virtual-element';
import assert from './assertions';
import Mock from 'dekujs/component-mock';
import { delay, mount } from './util';
import { FormField, CheckboxField } from '../lib';

describe('CheckboxField', function () {
  let mock = Mock(CheckboxField);

  it('should return a FormField component', function () {
    let node = mock.render();
    assert.node.isNode(node, FormField);
    assert.node.hasClass(node, 'CheckboxField');
  });

  it('should have a label with a nested checkbox as the control', function () {
    let props = { label: 'a' };
    let node = mock.render({ props });
    let control = node.children[0];
    assert.node.isNode(control, 'label');
    let [ input, label ] = control.children;
    assert.node.isNode(input, 'input');
    assert.strictEqual(label, 'a');
  });

  describe('with props', function () {
    let inputAttrs = {
      checked: true,
      name: 'test',
      required: true,
      value: 'hello world'
    };

    each(inputAttrs, function (attr, value) {
      describe(`.${attr}`, function () {
        it(`should add the attribute to the input`, function () {
          let props = { [attr]: value };
          let node = mock.render({ props });
          let input = node.children[0].children[0];
          assert.node.hasAttribute(input, attr, value);
        });
      });
    });

    let fieldAttrs = {
      hint: 'a'
    };

    each(fieldAttrs, function (attr, value) {
      describe(`.${attr}`, function () {
        it(`should add the attribute to the Field`, function () {
          let props = { [attr]: value };
          let node = mock.render({ props });
          assert.node.hasAttribute(node, attr, value);
        });
      });
    });

    describe('.label', function () {
      // TODO
    });

    describe('.onChange(e)', function () {
      it('should fire the event handler', function (done) {
        let app = mount(<CheckboxField onChange={handle} />);

        function handle(e) {
          assert.strictEqual(e.type, 'change');
          app.unmount();
          done();
        }

        trigger(app.element.querySelector('input'), 'change');
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
    it('should add validation error messages to the Field', function (done) {
      let app = mount(<CheckboxField name="name" required />);
      let checkbox = app.element.querySelector('input');
      trigger(checkbox, 'change'); // still unchecked, will fail validation

      delay(function () {
        assert(app.element.querySelector('.FormField-error'));
        app.unmount();
        done();
      }); // run after current stack so error handler has fired
    });

    it('should remove the error messages after being corrected', function (done) {
      let app = mount(<CheckboxField name="name" required />);
      let checkbox = app.element.querySelector('input');
      trigger(checkbox, 'change'); // still unchecked, will fail validation

      delay(function () {
        checkbox.checked = true;
        trigger(checkbox, 'change'); // now filled, will pass

        delay(function () {
          assert(!app.element.querySelector('.FormField-error'));
          app.unmount();
          done();
        });
      }); // run after current stack so error handler has fired
    });
  });
});

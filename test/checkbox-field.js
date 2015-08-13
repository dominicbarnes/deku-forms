
import each from 'component/each';
import nextTick from 'timoxley/next-tick';
import trigger from 'adamsanderson/trigger-event';
import dom from 'dekujs/virtual-element';
import assert from './assertions';
import { component, mount } from './util/component';
import { Field, CheckboxField } from '../lib';

describe('CheckboxField', function () {
  let noop = () => {};

  it('should return a Field component', function () {
    let node = CheckboxField.render(component(), noop);
    assert.vnode.isElement(node, Field);
  });

  it('should have a label with a nested checkbox as the control', function () {
    let props = { label: 'a' };
    let node = CheckboxField.render(component({ props }), noop);
    let control = node.children[0];
    assert.vnode.isElement(control, 'label');
    let [ input, label ] = control.children;
    assert.vnode.isElement(input, 'input');
    assert.strictEqual(label, 'a');
  });

  describe('with props', function () {
    let inputAttrs = {
      name: 'test',
      required: true,
      value: 'hello world'
    };

    each(inputAttrs, function (attr, value) {
      describe(`.${attr}`, function () {
        it(`should add the attribute to the input`, function () {
          let props = { [attr]: value };
          let node = CheckboxField.render(component({ props }), noop);
          let input = node.children[0].children[0];
          assert.vnode.hasAttribute(input, attr, value);
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
          let node = CheckboxField.render(component({ props }), noop);
          assert.vnode.hasAttribute(node, attr, value);
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
        let node = CheckboxField.render(component({ state }), noop);
        assert.vnode.hasAttribute(node, 'error', 'test');
      });
    });
  });

  describe('interaction', function () {
    it('should add validation error messages to the Field', function (done) {
      let app = mount(<CheckboxField name="name" required />);
      let checkbox = app.element.querySelector('input');
      trigger(checkbox, 'change'); // still unchecked, will fail validation

      nextTick(function () {
        assert(app.element.querySelector('.FormField-error'));
        app.unmount();
        done();
      }); // run after current stack so error handler has fired
    });

    it('should remove the error messages after being corrected', function (done) {
      let app = mount(<CheckboxField name="name" required />);
      let checkbox = app.element.querySelector('input');
      trigger(checkbox, 'change'); // still unchecked, will fail validation

      nextTick(function () {
        checkbox.checked = true;
        trigger(checkbox, 'change'); // now filled, will pass

        nextTick(function () {
          assert(!app.element.querySelector('.FormField-error'));
          app.unmount();
          done();
        });
      }); // run after current stack so error handler has fired
    });
  });
});

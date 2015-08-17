
/** @jsx dom */

import each from 'component/each';
import nextTick from 'timoxley/next-tick';
import trigger from 'adamsanderson/trigger-event';
import dom from 'dekujs/virtual-element';
import assert from './assertions';
import { component, mount } from './util/component';
import { Field, Select, SelectField } from '../lib';

describe('SelectField', function () {
  let noop = () => {};

  it('should return a Field component', function () {
    let node = SelectField.render(component(), noop);
    assert.vnode.isElement(node, Field);
  });

  it('should have a Select component as the control', function () {
    let node = SelectField.render(component(), noop);
    let input = node.children[0];
    assert.vnode.isElement(input, Select);
  });

  describe('with props', function () {
    let selectAttrs = {
      disabled: true,
      name: 'test',
      placeholder: 'test',
      required: true,
      size: 2,
      value: 'hello world'
    };

    each(selectAttrs, function (attr, value) {
      describe(`.${attr}`, function () {
        it('should add the attribute to the Select', function () {
          let props = { [attr]: value };
          let node = SelectField.render(component({ props }), noop);
          let select = node.children[0];
          assert.vnode.hasAttribute(select, attr, value);
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
          let node = SelectField.render(component({ props }), noop);
          assert.vnode.hasAttribute(node, attr, value);
        });
      });
    });

    describe('.id', function () {
      it('should add the id to the input', function () {
        let props = { id: 'test' };
        let node = SelectField.render(component({ props }), noop);
        let input = node.children[0];
        assert.vnode.hasAttribute(input, 'id', 'test');
      });

      it('should add the id to the Field', function () {
        let props = { id: 'test' };
        let node = SelectField.render(component({ props }), noop);
        assert.vnode.hasAttribute(node, 'id', 'test');
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
  });

  describe('with state', function () {
    describe('.error', function () {
      it('should add the error to the Field', function () {
        let state = { error: 'test' };
        let node = SelectField.render(component({ state }), noop);
        assert.vnode.hasAttribute(node, 'error', 'test');
      });
    });
  });

  describe('interaction', function () {
    it('should add validation error messages to the Field', function (done) {
      let app = mount(<SelectField name="name" required />);
      let select = app.element.querySelector('select');

      trigger(select, 'change'); // still empty, will fail validation
      nextTick(function () {
        assert(app.element.querySelector('.FormField-error'));
        app.unmount();
        done();
      }); // run after current stack so error handler has fired
    });

    it('should remove the error messages after being corrected', function (done) {
      let app = mount(<SelectField name="name" options={[ '', 'a', 'b' ]} required />);
      let select = app.element.querySelector('select');

      trigger(select, 'change'); // still empty, will fail validation
      nextTick(function () {
        select.value = 'a';
        trigger(select, 'change'); // now filled, will pass

        nextTick(function () {
          assert(!app.element.querySelector('.FormField-error'));
          app.unmount();
          done();
        });
      }); // run after current stack so error handler has fired
    });
  });
});

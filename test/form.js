
/** @jsx dom */

import dom from 'dekujs/virtual-element';
import trigger from 'adamsanderson/trigger-event';
import assert from './assertions';
import Mock from 'dekujs/component-mock';
import { delay, mount } from './util';
import { Form } from '../lib';

describe('Form', function () {
  let mock = Mock(Form);

  it('should return a form element', function () {
    var node = mock.render();
    assert.node.isNode(node, 'form');
  });

  it('should include the default attributes', function () {
    var node = mock.render();
    assert.node.hasClass(node, 'Form');
    assert.node.hasAttribute(node, 'novalidate', true);
  });

  describe('with props', function () {
    describe('.onSubmit(data, form)', function () {
      it('should fire when the form is submitted', function (done) {
        let app = mount(
          <Form onSubmit={handle}>
            <button type="submit">Submit</button>
          </Form>
        );

        function handle(data, form) {
          assert.deepEqual(data, {});
          assert.strictEqual(form, app.element.firstChild);
          app.unmount();
          done();
        }

        trigger(app.element.firstChild, 'submit');
      });

      it('should serialize the form data is submitted', function (done) {
        let app = mount(
          <Form onSubmit={handle}>
            <input name="hello" type="hidden" value="world" />
            <button type="submit">Submit</button>
          </Form>
        );

        function handle(data) {
          assert.deepEqual(data, { hello: 'world' });
          app.unmount();
          done();
        }

        trigger(app.element.firstChild, 'submit');
      });

      it('should only fire when validation passes', function (done) {
        let app = mount(
          <Form onSubmit={handle}>
            <input name="hello" required type="text" />
            <button type="submit">Submit</button>
          </Form>
        );

        function handle() {
          app.unmount();
          done(new Error('this should not have happened'));
        }

        trigger(app.element.firstChild, 'submit');

        // FIXME: add an `onInvalid` event handler?
        delay(function () {
          app.unmount();
          done();
        }, 100); // assume it didn't fire the handler if we make it 100ms
      });
    });

    describe('.transform(...)', function () {
      it('should serialize the form data is submitted', function (done) {
        let app = mount(
          <Form onSubmit={handle} transform={transform}>
            <input name="hello" type="hidden" value="world" />
            <button type="submit">Submit</button>
          </Form>
        );

        function handle(data) {
          assert.deepEqual(data, { hello: 'hello' });
          app.unmount();
          done();
        }

        function transform(key) {
          return key;
        }

        trigger(app.element.firstChild, 'submit');
      });
    });
  });

  describe('with children', function () {
    it('should set any children to the new node', function () {
      let children = [ 'Hello World' ];
      let props = { children };
      var node = mock.render({ props });
      assert.node.hasChildren(node, children);
    });
  });
});

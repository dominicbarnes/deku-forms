
import dom from 'dekujs/virtual-element';
import { render, tree } from 'dekujs/deku';
import component from './util/component';
import assert from './assertions';
import { Form } from '../lib';

describe('Form', function () {
  var main = document.createElement('main');
  let noop = () => {};

  before(function () {
    document.body.appendChild(main);
  });

  after(function () {
    document.body.removeChild(main);
  });

  it('should return a form element', function () {
    var node = Form.render(component(), noop);
    assert.vnode.isElement(node, 'form');
  });

  it('should include the default attributes', function () {
    var node = Form.render(component(), noop);
    assert.vnode.hasClass(node, 'Form');
    assert.vnode.hasAttribute(node, 'novalidate', true);
  });

  describe('with props', function () {
    describe('.onSubmit(data, form)', function () {
      it('should fire when the form is submitted', function (done) {
        let app = tree(
          <Form onSubmit={handle}>
            <button type="submit">Submit</button>
          </Form>
        );
        render(app, main);

        function handle(data, form) {
          assert.deepEqual(data, {});
          assert.strictEqual(form, main.firstChild);
          app.unmount();
          done();
        }

        // ugh ... form.submit() does not trigger events
        main.firstChild.lastChild.click();
      });

      it('should serialize the form data is submitted', function (done) {
        let app = tree(
          <Form onSubmit={handle}>
            <input name="hello" type="hidden" value="world" />
            <button type="submit">Submit</button>
          </Form>
        );
        render(app, main);

        function handle(data) {
          assert.deepEqual(data, { hello: 'world' });
          app.unmount();
          done();
        }

        // ugh ... form.submit() does not trigger events
        main.firstChild.lastChild.click();
      });

      it('should only fire when validation passes', function (done) {
        this.slow(500);

        let app = tree(
          <Form onSubmit={handle}>
            <input name="hello" required type="text" />
            <button type="submit">Submit</button>
          </Form>
        );
        render(app, main);

        function handle() {
          app.unmount();
          done(new Error('this should not have happened'));
        }

        // ugh ... form.submit() does not trigger events
        main.firstChild.lastChild.click();

        // FIXME: add an `onInvalid` event handler?
        setTimeout(done, 100); // assume it didn't fire the handler if we make it 100ms
      });
    });

    describe('.transform(...)', function () {
      it('should serialize the form data is submitted', function (done) {
        let app = tree(
          <Form onSubmit={handle} transform={transform}>
            <input name="hello" type="hidden" value="world" />
            <button type="submit">Submit</button>
          </Form>
        );
        render(app, main);

        function handle(data) {
          assert.deepEqual(data, { hello: 'hello' });
          app.unmount();
          done();
        }

        function transform(key) {
          return key;
        }

        // ugh ... form.submit() does not trigger events
        main.firstChild.lastChild.click();
      });
    });
  });

  describe('with children', function () {
    it('should set any children to the new node', function () {
      let children = 'Hello World';
      let props = { children };
      var node = Form.render(component({ props }), noop);
      assert.vnode.hasChildren(node, children);
    });
  });
});

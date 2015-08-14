
import { component } from './util/component';
import assert from './assertions';
import { Field } from '../lib';

describe('Field', function () {
  let noop = () => {};

  it('should return a div with right classes', function () {
    var node = Field.render(component(), noop);
    assert.vnode.isElement(node, 'div');
    assert.vnode.hasClass(node, 'FormField');
  });

  it('should have the right children elements', function () {
    var node = Field.render(component(), noop);
    assert.strictEqual(node.children.length, 4);
    let [ label, controls, error, hint ] = node.children;
    assert.strictEqual(label, null);
    assert.vnode.isElement(controls, 'div');
    assert.vnode.hasClass(controls, 'FormField-controls');
    assert.strictEqual(error, null);
    assert.strictEqual(hint, null);
  });

  describe('with props', function () {
    describe('.label', function () {
      it('should create a label element', function () {
        let props = { label: 'a' };
        var node = Field.render(component({ props }), noop);
        let label = node.children[0];
        assert.vnode.isElement(label, 'label');
        assert.vnode.hasClass(label, 'FormField-label');
        assert.vnode.hasChildren(label, 'a');
      });
    });

    describe('.id', function () {
      it('should add a for attribute to the label element', function () {
        let props = { label: 'a', id: 'b' };
        var node = Field.render(component({ props }), noop);
        let label = node.children[0];
        assert.vnode.hasAttribute(label, 'for', 'b');
      });
    });

    describe('.error', function () {
      it('should create an error element', function () {
        let props = { error: 'a' };
        var node = Field.render(component({ props }), noop);
        let error = node.children[2];
        assert.vnode.isElement(error, 'div');
        assert.vnode.hasClass(error, 'FormField-error');
      });

      it('should render the error message as markdown', function () {
        let props = { error: 'a' };
        var node = Field.render(component({ props }), noop);
        let error = node.children[2];
        assert.vnode.hasAttribute(error, 'innerHTML', '<p>a</p>\n');
      });
    });

    describe('.hint', function () {
      it('should create a hint element', function () {
        let props = { hint: 'a' };
        var node = Field.render(component({ props }), noop);
        let hint = node.children[3];
        assert.vnode.isElement(hint, 'div');
        assert.vnode.hasClass(hint, 'FormField-hint');
      });

      it('should render the error message as markdown', function () {
        let props = { hint: 'a' };
        var node = Field.render(component({ props }), noop);
        let hint = node.children[3];
        assert.vnode.hasAttribute(hint, 'innerHTML', '<p>a</p>\n');
      });
    });
  });

  describe('with children', function () {
    it('should set any children to the controls node', function () {
      let children = 'Hello World';
      let props = { children };
      var node = Field.render(component({ props }), noop);
      assert.vnode.hasChildren(node.children[1], children);
    });
  });
});

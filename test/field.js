
import assert from './assertions';
import Mock from 'component-mock';
import { FormField } from '../src';

describe('FormField', function () {
  let mock = Mock(FormField);

  it('should return a div with right classes', function () {
    var node = mock.render();
    assert.node.isNode(node, 'div');
    assert.node.hasClass(node, 'FormField');
    assert.node.notHasClass(node, 'has-error');
  });

  it('should have the right children elements', function () {
    var node = mock.render();
    assert.node.hasChildren(node, 5);
    let [ label, description, controls, error, hint ] = node.children;
    assert.strictEqual(label, null);
    assert.strictEqual(description, null);
    assert.node.isNode(controls, 'div');
    assert.node.hasClass(controls, 'FormField-controls');
    assert.strictEqual(error, null);
    assert.strictEqual(hint, null);
  });

  describe('with props', function () {
    describe('.class', function () {
      it('should add additional class names to the container', function () {
        let props = { class: 'a' };
        var node = mock.render({ props });
        assert.node.isNode(node, 'div');
        assert.node.hasClass(node, 'FormField');
        assert.node.hasClass(node, 'a');
      });

      it('should handle complex class inputs', function () {
        let props = { class: [ 'a', { b: true, c: false } ] };
        var node = mock.render({ props });
        assert.node.isNode(node, 'div');
        assert.node.hasClass(node, 'FormField');
        assert.node.hasClass(node, 'a');
        assert.node.hasClass(node, 'b');
      });
    });

    describe('.label', function () {
      it('should create a label element', function () {
        let props = { label: 'a' };
        var node = mock.render({ props });
        let label = node.children[0];
        assert.node.isNode(label, 'label');
        assert.node.hasClass(label, 'FormField-label');
        assert.node.hasChildren(label, 'a');
      });
    });

    describe('.labelClass', function () {
      it('should add additional class names to the label element', function () {
        let props = { label: 'a', labelClass: 'b' };
        var node = mock.render({ props });
        let label = node.children[0];
        assert.node.hasClass(label, 'b');
      });
    });

    describe('.description', function () {
      it('should create a description element', function () {
        let props = { description: 'a' };
        var node = mock.render({ props });
        let description = node.children[1];
        assert.node.isNode(description, 'div');
        assert.node.hasClass(description, 'FormField-description');
      });

      it('should render the description as markdown', function () {
        let props = { description: 'a' };
        var node = mock.render({ props });
        let description = node.children[1];
        assert.node.hasAttribute(description, 'innerHTML', '<p>a</p>\n');
      });
    });

    describe('.descriptionClass', function () {
      it('should add additional class names to the description element', function () {
        let props = { description: 'a', descriptionClass: 'b' };
        var node = mock.render({ props });
        let description = node.children[1];
        assert.node.hasClass(description, 'b');
      });
    });

    describe('.id', function () {
      it('should add a for attribute to the label element', function () {
        let props = { label: 'a', id: 'b' };
        var node = mock.render({ props });
        let label = node.children[0];
        assert.node.hasAttribute(label, 'for', 'b');
      });
    });

    describe('.error', function () {
      it('should create an error element', function () {
        let props = { error: 'a' };
        var node = mock.render({ props });
        let error = node.children[3];
        assert.node.isNode(error, 'div');
        assert.node.hasClass(error, 'FormField-error');
      });

      it('should render the error message as markdown', function () {
        let props = { error: 'a' };
        var node = mock.render({ props });
        let error = node.children[3];
        assert.node.hasAttribute(error, 'innerHTML', '<p>a</p>\n');
      });

      it('should add an error class', function () {
        let props = { error: 'a' };
        var node = mock.render({ props });
        assert.node.hasClass(node, 'has-error');
      });
    });

    describe('.errorClass', function () {
      it('should add additional classes to the error element', function () {
        let props = { error: 'a', errorClass: 'b' };
        var node = mock.render({ props });
        let error = node.children[3];
        assert.node.hasClass(error, 'b');
      });
    });

    describe('.hint', function () {
      it('should create a hint element', function () {
        let props = { hint: 'a' };
        var node = mock.render({ props });
        let hint = node.children[4];
        assert.node.isNode(hint, 'div');
        assert.node.hasClass(hint, 'FormField-hint');
      });

      it('should render the error message as markdown', function () {
        let props = { hint: 'a' };
        var node = mock.render({ props });
        let hint = node.children[4];
        assert.node.hasAttribute(hint, 'innerHTML', '<p>a</p>\n');
      });
    });

    describe('.hintClass', function () {
      it('should add additional classes to the hint element', function () {
        let props = { hint: 'a', hintClass: 'b' };
        var node = mock.render({ props });
        let hint = node.children[4];
        assert.node.hasClass(hint, 'b');
      });
    });
  });

  describe('with children', function () {
    it('should set any children to the controls node', function () {
      let children = [ 'Hello World' ];
      let props = { children };
      var node = mock.render({ props });
      assert.node.hasChildren(node.children[2], children);
    });
  });
});

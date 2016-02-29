
/** @jsx dom */

import each from 'for-each';
import trigger from 'compat-trigger-event';
import dom from 'virtual-element';
import assert from './assertions';
import Mock from 'component-mock';
import { mount } from './util';
import { Select } from '../src';

describe('Select', function () {
  let mock = Mock(Select);

  it('should return a select element', function () {
    let node = mock.render();
    assert.node.isNode(node, 'select');
  });

  describe('with props', function () {
    let attrs = {
      disabled: true,
      id: 'a',
      name: 'b',
      required: true,
      size: 2
    };

    each(attrs, function (value, attr) {
      describe(`.${attr}`, function () {
        it('should add the attribute to the select', function () {
          let props = { [attr]: value };
          let node = mock.render({ props });
          assert.node.hasAttribute(node, attr, value);
        });
      });
    });

    describe('.options', function () {
      it('should generate option elements from a simple array', function () {
        let options = [ 'a', 'b', 'c' ];
        let props = { options };
        let node = mock.render({ props });
        assert.node.hasChildren(node, function (node, x) {
          assert.node.isNode(node, 'option');
          assert.node.hasAttribute(node, 'value', options[x]);
          assert.node.hasChildren(node, options[x]);
          return true;
        });
      });

      it('should generate option elements from an array of objects', function () {
        let options = [
          { label: 'a', value: 1 },
          { label: 'b', value: 2 },
          { label: 'c', value: 3 }
        ];
        let props = { options };
        let node = mock.render({ props });
        assert.node.hasChildren(node, function (node, x) {
          assert.node.isNode(node, 'option');
          assert.node.hasAttribute(node, 'value', options[x].value);
          assert.node.hasAttribute(node, 'selected', false);
          assert.node.hasChildren(node, options[x].label);
          return true;
        });
      });

      it('should select the correct option from the value prop', function () {
        let options = [ 'a', 'b', 'c' ];
        let value = 'b';
        let props = { options, value };
        let node = mock.render({ props });
        assert.node.hasChildren(node, function (node, x) {
          assert.node.hasAttribute(node, 'selected', options[x] === value);
          return true;
        });
      });
    });

    describe('.onBlur(e)', function () {
      it('should fire the event handler', function (done) {
        let options = [ 'a', 'b', 'c' ];
        let app = mount(<Select onBlur={handle} options={options} />);

        function handle(e) {
          assert.strictEqual(e.type, 'blur');
          app.unmount();
          done();
        }

        trigger(app.element.querySelector('select'), 'blur');
      });
    });

    describe('.onChange(e)', function () {
      it('should fire the event handler', function (done) {
        let options = [ 'a', 'b', 'c' ];
        let app = mount(<Select onChange={handle} options={options} />);

        function handle(e) {
          assert.strictEqual(e.type, 'change');
          app.unmount();
          done();
        }

        trigger(app.element.querySelector('select'), 'change');
      });
    });

    describe('.onFocus(e)', function () {
      it('should fire the event handler', function (done) {
        let options = [ 'a', 'b', 'c' ];
        let app = mount(<Select onFocus={handle} options={options} />);

        function handle(e) {
          assert.strictEqual(e.type, 'focus');
          app.unmount();
          done();
        }

        trigger(app.element.querySelector('select'), 'focus');
      });
    });

    describe('.placeholder', function () {
      it('should prefix an option', function () {
        let options = [ 'a', 'b', 'c' ];
        let props = { options, placeholder: 'placeholder' };
        let node = mock.render({ props });
        assert.node.hasChildren(node, 4);
      });

      it('should create an option with no value', function () {
        let options = [ 'a', 'b', 'c' ];
        let props = { options, placeholder: 'placeholder' };
        let node = mock.render({ props });
        var placeholder = node.children[0];
        assert.node.hasAttribute(placeholder, 'value', undefined);
        assert.node.hasChildren(placeholder, 'placeholder');
      });
    });
  });
});


import each from 'component/each';
import trigger from 'adamsanderson/trigger-event';
import dom from 'dekujs/virtual-element';
import assert from './assertions';
import { component, mount } from './util/component';
import { Select } from '../lib';

describe('Select', function () {
  let noop = () => {};

  it('should return a select element', function () {
    let node = Select.render(component(), noop);
    assert.vnode.isElement(node, 'select');
  });

  describe('with props', function () {
    let attrs = {
      disabled: true,
      id: 'a',
      name: 'b',
      required: true,
      size: 2
    };

    each(attrs, function (attr, value) {
      describe(`.${attr}`, function () {
        it(`should add the attribute to the select`, function () {
          let props = { [attr]: value };
          let node = Select.render(component({ props }), noop);
          assert.vnode.hasAttribute(node, attr, value);
        });
      });
    });

    describe('.options', function () {
      it('should generate option elements from a simple array', function () {
        let options = [ 'a', 'b', 'c' ];
        let props = { options };
        let node = Select.render(component({ props }), noop);
        assert.vnode.hasChildren(node, function (node, x) {
          assert.vnode.isElement(node, 'option');
          assert.vnode.hasAttribute(node, 'value', options[x]);
          assert.vnode.hasChildren(node, options[x]);
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
        let node = Select.render(component({ props }), noop);
        assert.vnode.hasChildren(node, function (node, x) {
          assert.vnode.isElement(node, 'option');
          assert.vnode.hasAttribute(node, 'value', options[x].value);
          assert.vnode.hasAttribute(node, 'selected', false);
          assert.vnode.hasChildren(node, options[x].label);
          return true;
        });
      });

      it('should select the correct option from the value prop', function () {
        let options = [ 'a', 'b', 'c' ];
        let value = 'b';
        let props = { options, value };
        let node = Select.render(component({ props }), noop);
        assert.vnode.hasChildren(node, function (node, x) {
          assert.vnode.hasAttribute(node, 'selected', options[x] === value);
          return true;
        });
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

    describe('.placeholder', function () {
      it('should prefix an option', function () {
        let options = [ 'a', 'b', 'c' ];
        let props = { options, placeholder: 'placeholder' };
        let node = Select.render(component({ props }), noop);
        assert.vnode.hasChildren(node, 4);
      });

      it('should create an option with no value', function () {
        let options = [ 'a', 'b', 'c' ];
        let props = { options, placeholder: 'placeholder' };
        let node = Select.render(component({ props }), noop);
        var placeholder = node.children[0];
        assert.vnode.hasAttribute(placeholder, 'value', undefined);
        assert.vnode.hasChildren(placeholder, 'placeholder');
      });
    });
  });
});

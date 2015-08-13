/* eslint-disable no-param-reassign */

/**
 * Module dependencies.
 */
import assert from 'component/assert';


/**
 * Asserts that `node` is a virtual node object that is an "element" type.
 *
 * If `type` is passed, it must strictly match the type on the virtual node.
 * Strings are used for raw HTML elements, while components are raw objects.
 *
 * @param {Node} node             The virtual node to inspect.
 * @param {String|Object} [type]  The type to check for.
 */
export function isElement(node, type) {
  assert(node, 'must pass a virtual node');
  if (type) {
    assert.strictEqual(node.type, type);
  } else {
    assert.strictEqual(typeof node.type, 'string');
  }
}

/**
 * Asserts that the virtual node object `node`, has a given class `name`.
 *
 * @param {Node} node    The virtual node to inspect.
 * @param {String} name  The class name to search for.
 */
export function hasClass(node, name) {
  isElement(node);
  assert(name, 'must specify a class name');

  var attr = node.attributes.class || '';
  var classes = attr.trim().split(/\s+/g);
  assert(classes.indexOf(name) > -1, `did not find "${name}" in "${attr}"`);
}

/**
 * Asserts that the virtual node object `node`, has a given attribute `attr`.
 * If `value` is passed as well, it will check for strict equality on the
 * attribute's value.
 *
 * @param {Node} node      The virtual node to inspect.
 * @param {String} attr    The attribute to check for.
 * @param {Mixed} [value]  If given, the value that the attribute must match.
 */
export function hasAttribute(node, attr, value) {
  assert(node, 'must pass a virtual node');
  assert(attr, 'must specify an attribute name');

  if (typeof value === 'undefined') {
    assert(attr in node.attributes, `attribute ${attr} was not defined`);
  } else {
    assert.strictEqual(node.attributes[attr], value, `attribute ${attr} was not equal to ${value}`);
  }
}

/**
 * Asserts that the virtual node object `node` has the given `children` sub-nodes.
 *
 * For each `children` element, they can be either:
 *  - a string (which is converted into a virtual node internally)
 *  - a raw node object (must be the same reference to pass)
 *  - a function (must return true for all children nodes to pass)
 *
 * @param {Node} node       The virtual node to inspect.
 * @param {Array} children  The list of children sub-nodes.
 */
export function hasChildren(node, children) {
  assert(node, 'must pass a virtual node');
  assert(children, 'must pass the expected children');

  let list = node.children || node.props.children;

  if (typeof children === 'function') {
    assert(list.every(children), 'some of the children failed the test fn');
  } else {
    if (!Array.isArray(children)) children = [ children ]; // normalize

    list.forEach((node, x) => {
      var actual = node;
      var expected = children[x];

      if (actual.type === 'text') {
        assert.strictEqual(actual.data, expected);
      } else {
        assert.strictEqual(actual, expected);
      }
    });
  }
}

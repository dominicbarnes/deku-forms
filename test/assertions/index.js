
/**
 * Module dependencies.
 */

import assert from 'component/assert';
import * as component from './component';
import * as vnode from './virtual-node';

/**
 * Add to the `assert` namespace.
 */

assert.component = component;
assert.vnode = vnode;

/**
 * Export `assert` as the public API.
 */

export default assert;

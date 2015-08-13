
/**
 * Module dependencies.
 */

import assert from 'component/assert';
import { deku, renderString } from 'dekujs/deku';

/**
 * Tests that the given `actual` virtual node renders the same
 * as the `expected` virtual node.
 *
 * This test actually uses deku to render these things as
 * strings, making it more suitable for an integration test.
 *
 * @param {Node} actual
 * @param {Node} expected
 */

export function renders(actual, expected) {
  var app = deku();
  app.mount(actual);
  var actualString = renderString(app);
  app.mount(expected);
  var expectedString = renderString(app);
  assert.equal(actualString, expectedString);
}

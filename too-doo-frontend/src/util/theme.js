import { applyToOneOrMany } from './misc';

const tbMixin = {
  plain: 56,
  media: [48, 64]
};

/**
 *
 * @param {Array<string>|string} property
 * @param {function} transform
 * @returns {Object}
 */
function matchToolbar(property, transform = v => v) {
  const style = {};

  applyToOneOrMany(property, p => style[p] = transform(tbMixin.plain));
  applyToOneOrMany(property, p => style[p] = tbMixin.media.map(sz => transform(sz)));

  return style;
}

export {
  matchToolbar,
  tbMixin
};
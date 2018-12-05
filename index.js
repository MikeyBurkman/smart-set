'use strict';

const type = Symbol('smartset');

const createSet = (idFn, initialValues) => {
  if (!idFn) {
    idFn = (x) => x;
  }

  const init = initialValues ? initialValues.map((x) => [idFn(x), x]) : [];

  const map = new Map(init);

  const ret = {
    get size() {
      return map.size;
    },
    [Symbol.iterator]: () => map.values(),
    clear: () => map.clear(),
    asArray: () => Array.from(map.values()),
    add: (x) => {
      map.set(idFn(x), x);
      return ret;
    },
    addAll: (xs) => {
      xs.forEach(ret.add);
      return ret;
    },
    delete: (x) => map.delete(idFn(x)),
    deleteId: (id) => map.delete(id),
    has: (x) => map.has(idFn(x)),
    hasId: (id) => map.has(id),
    clone: () => createSet(idFn, ret.asArray()),
    [type]: true
  };

  return ret;
};

const toSet = (idFn) => (acc, item) => {
  // First acc to a regular reduce will be the first item to add to the set.
  // So if acc isn't our set, then make it one with that first item added.
  const set = acc[type] ? acc : createSet(idFn).add(acc);
  set.add(item);
  return set;
};

module.exports = {
  createSet: createSet,
  toSet: toSet
};

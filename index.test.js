'use strict';

const sut = require('./index.js');

it('Should have basic set functionality', () => {
  const set = sut.createSet((x) => x.id);
  set.add({ id: 1, name: 'foo' });
  set.add({ id: 2, name: 'bar' });
  set.add({ id: 1, name: 'foo' });

  expect(set.size).toEqual(2);
  expect(set.has({ id: 1, name: 'foo' })).toBeTruthy();
  expect(set.has({ id: 2, name: 'bar' })).toBeTruthy();
  expect(set.has({ id: 3, name: 'baz' })).toBeFalsy();
  expect(set.hasId(1)).toBeTruthy();

  const arr = set.asArray();
  expect(arr).toContainEqual({ id: 1, name: 'foo' });
  expect(arr).toContainEqual({ id: 2, name: 'bar' });

  expect(set.delete({ id: 1, name: 'foo' })).toBeTruthy();
  expect(set.delete({ id: 1, name: 'foo' })).toBeFalsy();
  expect(set.size).toEqual(1);

  expect(set.deleteId(2)).toBeTruthy();
  expect(set.deleteId(2)).toBeFalsy();
  expect(set.size).toEqual(0);

  set.addAll([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }, { id: 1, name: 'foo' }]);
  expect(set.size).toEqual(2);
  expect(set.has({ id: 1, name: 'foo' })).toBeTruthy();
  expect(set.has({ id: 2, name: 'bar' })).toBeTruthy();

  const clonedSet = set.clone();
  set.deleteId(1);
  expect(set.size).toEqual(1);
  expect(clonedSet.size).toEqual(2);
  expect(clonedSet.hasId(1)).toBeTruthy();
  expect(clonedSet.hasId(2)).toBeTruthy();
});

it('Should support the native array reduce to turn into a set', () => {
  const arr = [
    {
      id: 1,
      name: 'foo'
    },
    {
      id: 2,
      name: 'bar'
    },
    {
      id: 1,
      name: 'foo'
    }
  ];

  const set = arr.reduce(sut.toSet((x) => x.id));

  expect(set.size).toEqual(2);
  expect(set.has({ id: 1, name: 'foo' })).toBeTruthy();
  expect(set.has({ id: 2, name: 'bar' })).toBeTruthy();
});

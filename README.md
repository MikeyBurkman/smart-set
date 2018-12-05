# smart-set

A Set implementation in JS capable of holding more than just primitives

```js
const { createSet } = require('smart-set');

const set = createSet((x) => x.id); // Use the 'id' field on each item to decide equality
set.add({ id: 1, name: 'Joe' });
set.add({ id: 2, name: 'Barb' });
set.add({ id: 1, name: 'Joe' });

const total = set.size; // size is 2 -- the duplicate id = 1 was not added

const items = set.asArray(); // [{id: 1, name: 'Joe'}, {id: 2, name: 'Barb'}]
```

## What's wrong with the native Set?

There are several reasons not like the native Set:

1. Sets can not really hold complex objects. They can, but they use instance equality to decide uniqueness, which is less than ideal, and honestly quite error-prone as it's something you might miss in unit tests.
2. The API for sets is a little limited, and in some places kind of baffling. For instance, there's no function on set to turn it into an array; you have to do `Array.from(set)`. Why? It's also got `forEach` on it, but no other Array functions. (Also, why does a Set have `keys()`, `values()`, and `entries()` on it?)
3. It's a JS class, and thus has a hidden `this` context that must always be used or you'll get a nasty error. Thus you can't do something like `array.forEach(mySet.add)` without binding the `add` function to `mySet`.

## Why is smart-set better?

1. It can hold complex objects. To do this, you'll need to give it a function that takes any item you plan to add, and returns a (most likely) primitive object that can be used as the key for a native Set. Usually this would be an ID value or something, though it could also be a a string with multiple values embedded in it, if you need a complex key.
2. There are a few more sensible functions on smart-set, such as `addAll(items)` and `asArray()`. (TODO: Will add extra functions like `intersection(otherSet)` in a future version. This is a living API, unlike the native Set which is pretty much set in stone.)
3. There is no `this` context to worry about with smart-sets. `arr.map(mySmartSet.add);` works as you'd expect. Go as FP-happy as you want.

## Performance?

Smart-set uses the native Map under the hood, so it should be about as performant as the native Set, which also uses Map. The only overhead is calling the key function (given at set construction) every time a value needs to be added or looked up.

## API

TODO Look at `index.d.ts` for now until I complete this part.

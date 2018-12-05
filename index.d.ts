declare module 'smart-set' {
  export interface SmartSet<Item, IdType> {
    size: number;
    clear: () => void;
    asArray: () => Item[];
    add: (x: Item) => SmartSet<Item, IdType>;
    addAll: (xs: Item[]) => SmartSet<Item, IdType>;
    delete: (x: Item) => bool;
    deleteId: (id: IdType) => bool;
    has: (x: Item) => bool;
    hasId: (id: IdType) => bool;
    clone: () => SmartSet<Item, IdType>;
  }

  export interface Mod {
    /**
     * Creates a smart set using the given function to define the identity of objects.
     * This function should ideally return a primitive type, such as a string or a number.
     */
    createSet: <Item, IdType>(idFn: (item: Item) => IdType) => SmartSet<Item, IdType>;

    /**
     * This is a convenience function to use the native Array.reduce() to create a smart set.
     * For instance: const set = arr.reduce(toSet((x) => x.id));
     */
    toSet: <Item, IdFn>(
      idFn: (item: Item) => IdType
    ) => (acc: SmartSet<Item, IdType>, item: Item) => SmartSet<Item, IdType>;
  }

  export const exp: Mod;
}

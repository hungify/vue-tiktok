export const objectKeys = <Obj extends Record<string, unknown>>(obj: Obj): Array<keyof Obj> => {
  return Object.keys(obj) as (keyof Obj)[];
};

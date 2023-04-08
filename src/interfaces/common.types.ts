export type GenericProjection<T> = {
  [P in keyof T]?: 0 | 1 | GenericProjection<T[P]>;
};
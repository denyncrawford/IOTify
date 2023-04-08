
export type ManyToMany<T> = T | T[];

export type Modify<T, R> = Omit<T, keyof R> & R;
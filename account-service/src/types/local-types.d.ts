import type { SchemaTypeOptions } from 'mongoose';

declare module 'local-types' {
  export type MongooseSchemaDef<T, E = never> = Record<Exclude<keyof T | '_id', E>, SchemaTypeOptions<any>>;
  export type SomeKeys<T extends object, U extends keyof T> = keyof Pick<T, U>;

  export interface User {
    email: string;
    name: string;
    active: boolean;
    password: string;
  }

  export interface Account {
    _id: string,
    user: string,
    active: boolean,
    no_of_post: number,
    no_of_comments: number,
  }

  export interface Post {
    author: string,
    body: string,
    comments: { body: string, author: string }[],
  }

  export type AccountUpdatable = SomeKeys<Account, 'no_of_post' | 'no_of_comments'>
}

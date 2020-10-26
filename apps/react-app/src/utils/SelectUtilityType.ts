/**
 * Define an Utility Type that requires ("select") a given keys sets R from
 * a given type schema T and making all other keys from T optional.
 *
 * This allows defining a data schema in one place, and specifying requirement
 * specs in context where it is used with some degree of forward compatibilty.
 *
 * The intent is made clear : "Here I need this type of thing with at least this
 * keys defined".
 *
 * Inspired by Rich Hickey talk "Maybe Not" on clojure specs.
 */

export type Select<T, R extends keyof T> = Partial<T> & Pick<T, R>;
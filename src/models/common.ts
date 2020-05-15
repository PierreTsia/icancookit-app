export declare class As<S extends string> {
  private as: S;
}
/**
 * Tagged template. Has the same effect on the computed value as the native template literal,
 * expect that the return type can be (implicitly) down-casted from string.
 */
export function $<T extends (string & As<string>) | undefined | null>(strings: TemplateStringsArray, ...args: any[]): T {
  return args.reduce((res, arg, i) => res + arg + strings[i + 1], strings[0]);
}

export enum DurationUnit {
  hour = 'H',
  day = 'D',
  week = 'W',
  month = 'M',
  year = 'Y',
}

import classnames from 'classnames';
import { ClassNamesFn, ClassValue } from 'classnames/types';

/**
 * add prefix to every `classnames` arguments
 * @param {string} CLS_PREFIX prefix
 * @param {string} seperator
 * @return {string} plain className
 */
const classPrefix = (CLS_PREFIX: string = '', seperator: string = '-'): ClassNamesFn => {
  const addPrefix = (cls: string | number) => (!!CLS_PREFIX && !!cls ? `${CLS_PREFIX}${seperator}${cls}` : cls);

  const loop = (arg: ClassValue): ClassValue => {
    if (typeof arg === 'string' || typeof arg === 'number') {
      return addPrefix(arg);
    } else if (Array.isArray(arg) && arg.length) {
      return arg.map(loop);
    } else if (arg != null && typeof arg === 'object') {
      const output = {};
      Object.entries(arg).forEach(([key, value]) => {
        output[addPrefix(key)] = value;
      });
      return output;
    }
    return arg;
  };

  return (...args: ClassValue[]): string => {
    if (args.length === 0) {
      return CLS_PREFIX;
    }
    return classnames(...args.map(loop));
  };
};

export default classPrefix;

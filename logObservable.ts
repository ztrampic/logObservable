import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

/**
 * Decorator for console.log Observable data
 * @param target 
 * @param propertyKey 
 */
export const logObservable$ = (target: any, propertyKey: string) => {
    let propertyValue: any;
    function getter(): any {
      return propertyValue;
    }
    function setter(value: any): void {
      if (value instanceof Observable) {
        propertyValue = value.pipe(
          tap(((res: any[]) => {
            const isArrayOfObjects = Array.isArray(res) && typeof res[0] === 'object';
            const logType = isArrayOfObjects ? 'table' : 'log';
            console.groupCollapsed(propertyKey);
            console[logType](res);
            console.groupEnd();
          }))
        );
      } else {
        propertyValue = value;
      }
    }
  
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
};

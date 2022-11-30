# logObservable - log data in console from observable

--- Example ---

@Component({...})
export class Usage {
  @logObservable$ dataSourceExample$: Observable<SomeType>;
  ...
}

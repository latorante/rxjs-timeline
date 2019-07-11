/// <reference path="../../global.d.ts" />

import { BehaviorSubject } from 'rxjs';

/**
 * Timeline main component props
 */
export interface ReactiveColumnWrapperProps {
  i: number;
  observableItemSubject$: BehaviorSubject<null | EventResult>;
}

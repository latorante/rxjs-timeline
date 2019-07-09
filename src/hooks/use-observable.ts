import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

export const useObservable = (
  observable$: Observable<any>,
  initialValue: any
): EventResult => {
  const [value, update] = useState(initialValue);
  useEffect(() => {
    const s = observable$.subscribe(update);
    return () => s && s.unsubscribe();
  }, [observable$]);
  return value;
};

export default useObservable;

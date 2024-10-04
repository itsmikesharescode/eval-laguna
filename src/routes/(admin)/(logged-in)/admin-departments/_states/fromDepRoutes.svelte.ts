import { getContext, setContext } from 'svelte';

export const departments = ['BSIT', 'BSCS'];

class DepRouteState {
  private route = $state<'BSIT' | 'BSCS'>('BSIT');

  setRoute(param: 'BSIT' | 'BSCS') {
    this.route = param;
  }

  getRoute() {
    return this.route;
  }
}

const DEP_ROUTE_STATE_KEY = Symbol('depRouteStateKey');

export const initDepRouteState = () => {
  return setContext(DEP_ROUTE_STATE_KEY, new DepRouteState());
};

export const fromDepRouteState = () => {
  return getContext<ReturnType<typeof initDepRouteState>>(DEP_ROUTE_STATE_KEY);
};

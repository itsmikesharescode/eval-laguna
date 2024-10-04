import type { AdminLayoutQueryType, ProfessorType } from '$lib/types';
import { getContext, setContext } from 'svelte';

class DepartmentsRoute {
  private professors = $state<AdminLayoutQueryType['professors'] | null>(null);

  setProfs(param: AdminLayoutQueryType['professors'] | null) {
    this.professors = param;
  }

  getProfs() {
    return this.professors;
  }

  setDepProf(param: ProfessorType[], dep: 'BSIT' | 'BSCS') {
    if (this.professors) {
      if (dep === 'BSIT') this.professors.bsitDep = param;
      if (dep === 'BSCS') this.professors.bscsDep = param;
      /* else if (dep === 'BTVTED') this.professors.btvtedDep = param;
      else if (dep === 'DICT') this.professors.dictDep = param;
      else if (dep === 'DOMT') this.professors.domtDep = param; */
    }
  }

  getDepProf(dep: 'BSIT' | 'BSCS') {
    if (dep === 'BSIT') return this.professors?.bsitDep;
    if (dep === 'BSCS') return this.professors?.bscsDep;
    /*  else if (dep === 'BTVTED') return this.professors?.btvtedDep;
    else if (dep === 'DICT') return this.professors?.dictDep;
    else if (dep === 'DOMT') return this.professors?.domtDep; */
  }
}

const DEPARTMENT_KEY = Symbol('departmentRouteKey');

export const initDepartmentsRoute = () => {
  return setContext(DEPARTMENT_KEY, new DepartmentsRoute());
};

export const fromDepartmentsRouteState = () => {
  return getContext<ReturnType<typeof initDepartmentsRoute>>(DEPARTMENT_KEY);
};

import {CREATE_EMP,READ_EMPS} from "./employeeAction";

export function employeeReducer(employee = [],action) {
  switch (action.type) {
    case CREATE_EMP:
      return [
        ...employee,...action.response.data.data
      ];
    case READ_EMPS:
        return [
          ...action.response.data.data
        ];
    default:
      return employee;
  }
}

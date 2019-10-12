import {CREATE_EMP,READ_EMPS,READ_EMP,UPDATE_EMP} from "./employeeAction";

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
    case READ_EMP:
    case UPDATE_EMP:    
      // const data = action.response.data
      // return { ...events, [data.id]: data }
        console.log("UPDATE_EMP",action.response.data.data)    
    default:
      return employee;
  }
}

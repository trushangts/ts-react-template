import {CREATE_EMP} from "./employeeAction";

export function employeeReducer(
  state = {
    username: null,
    picture: null,
    activity: null
  },
  action
) {
  switch (action.type) {
    case CREATE_EMP:
      console.log("Create Emp Reducer Called")
      console.log(action)
      return {
        ...action.payload
      };
    default:
      return state;
  }
}

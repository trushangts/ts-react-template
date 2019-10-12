import { getJSON } from "../../common/utils/functions";
import axios from 'axios'

export const READ_EVENTS = 'READ_EVENTS'
export const READ_EVENT = 'READ_EVENT'
export const CREATE_EVENT = 'CREATE_EVENT'
export const CREATE_EMP = 'CREATE_EMP'
export const READ_EMPS = 'READ_EMPS'
export const READ_EMP = 'READ_EMP'
export const UPDATE_EMP = 'UPDATE_EMP'

export const UPDATE_EVENT = 'UPDATE_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'

const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1'
const QUERYSTRING = '?token=token123'
const API_URL = "";

export const empGetEvent = values => async dispatch => {
  const response = await axios.post(`http://192.168.0.157/reactApp/React_16.x/server/employee.php?action=index`, values)
  dispatch({ type: READ_EMPS, response })
}

export const empAddEvent = values => async dispatch => {
  console.log('empAddEvent');
  const response = await axios.post(`http://192.168.0.157/reactApp/React_16.x/server/employee.php?action=add`, JSON.stringify(values))
  console.log(response);
  dispatch({ type: CREATE_EMP, response })
}

export const empGetIdEvent= values => async dispatch => {
  console.log('empGetIdEvent');
  let param = {'id':values};
  const response = await axios.post(`http://192.168.0.157/reactApp/React_16.x/server/employee.php?action=index`, JSON.stringify(param))
  dispatch({ type: READ_EMP, response })
}

export const empEditEvent = values => async dispatch => {
  console.log('empEditEvent:',values);
  const response = await axios.post(`http://192.168.0.157/reactApp/React_16.x/server/employee.php?action=update`, JSON.stringify(values))
  dispatch({ type: UPDATE_EMP, response })
}

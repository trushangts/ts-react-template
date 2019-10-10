import Loadable from "react-loadable";
import { Loading } from "../../common/navigation";

const Employee = Loadable({
    loader: () => import("./components/Employee"),
    loading: Loading
});

const AddEmployee = Loadable({
  loader: () => import("./components/AddEmployee"),
  loading: Loading
});

const EmployeeList = Loadable({
  loader: () => import("./components/EmployeeList"),
  loading: Loading
});

export const routes = [
  {
    path: "/employee",
    exact: true,
    name: "Employee",
    component: Employee
  },
  {
    path: "/add_employee",
    exact: true,
    name: "Add Employee",
    component: AddEmployee
  },
  {
    path: "/employeelist",
    exact: true,
    name: "Add Employee",
    component: EmployeeList
  }

  
];

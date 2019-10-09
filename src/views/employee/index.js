import Loadable from "react-loadable";
import { Loading } from "../../common/navigation";

const Employee = Loadable({
    loader: () => import("./components/Employee"),
    loading: Loading
});

export const routes = [
  {
    path: "/employee",
    exact: true,
    name: "Employee",
    component: Employee
  }
];

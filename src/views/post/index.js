import Loadable from "react-loadable";
import { Loading } from "../../common/navigation";

const Post = Loadable({
    loader: () => import("./components/Post"),
    loading: Loading
});

// const AddEmployee = Loadable({
//   loader: () => import("./components/AddEmployee"),
//   loading: Loading
// });

// const EmployeeList = Loadable({
//   loader: () => import("./components/EmployeeList"),
//   loading: Loading
// });

export const routes = [
  {
    path: "/postlist",
    exact: true,
    name: "Post",
    component: Post
  }
  //,
  // {
  //   path: "/add_employee",
  //   exact: true,
  //   name: "Add Employee",
  //   component: AddEmployee
  // },
  // {
  //   path: "/employeelist",
  //   exact: true,
  //   name: "Add Employee",
  //   component: EmployeeList
  // }  
];

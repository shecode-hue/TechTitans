import {
  Homepage,
  CreateActivityForm,
  LoginForm,
  ActivitiesPage,
  BookActivityForm,
  RegisterForm,
  About,
} from "../pages";
import { routesDictionary } from "./routes-dictionary";

const {
  home,
  about,
  register,
  activities,
  book_activity,
  create_activity,
  logout,
  login,
} = routesDictionary;

export const routes = [
  {
    path: home,
    exact: true,
    element: <Homepage />,
  },
  {
    path: about,
    exact: true,
    element: <About />,
  },
  {
    path: register,
    exact: true,
    element: <RegisterForm />,
  },
  {
    path: create_activity,
    exact: true,
    element: <CreateActivityForm />,
  },
  {
    path: book_activity,
    exact: true,
    element: <BookActivityForm />,
  },
  {
    path: activities,
    exact: true,
    element: <ActivitiesPage />,
  },
  {
    path: login,
    exact: true,
    element: <LoginForm />,
  },
  {
    path: logout,
    exact: true,
    element: <LoginForm />,
  },
];

export default routes;

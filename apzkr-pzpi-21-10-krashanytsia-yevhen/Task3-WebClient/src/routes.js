import Home from "./page/Home";
import Create from "./page/Create";
import Auth from "./page/Auth";
import Info from "./page/Info";
import Cart from "./page/Cart";
import {AUTH, CREATE, HOME, INFO, REGISTRATION_ROUTE, CART_ROUTE, ADMIN, CATEGORY} from "./utils/constant";
import Admin from "./page/Admin";
import AddCategoryPage from "./page/AddCategoryPage";

export const authRoutes = [

    {
        path: ADMIN,
        Component: Admin
    },
    {
        path: CATEGORY,
        Component: AddCategoryPage
    }
];

export const publicRoutes = [
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: HOME,
        Component: Home
    },
    {
        path: INFO  + '/:id',
        Component: Info
    },
    {
        path: AUTH,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: CREATE,
        Component: Create
    },

];

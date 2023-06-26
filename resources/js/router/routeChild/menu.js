import auth from "../../middleware/auth";
import checkAuth from "../../middleware/auth-check";

export default [
    {
        path: '/menus',
        name: 'menus',
        meta: {
            middleware: [auth,checkAuth]
        },
        component: () => import('../../views/pages/menu/index'),
    },
];

import auth from "../../middleware/auth";
import checkAuth from "../../middleware/auth-check";

export default [
    {
        path: '/menu-tree',
        name: 'menu-tree',
        meta: {
            middleware: [auth,checkAuth]
        },
        component: () => import('../../views/pages/menu-tree/index'),
    },
];

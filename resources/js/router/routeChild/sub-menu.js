import auth from "../../middleware/auth";
import checkAuth from "../../middleware/auth-check";

export default [
    {
        path: '/sub-menu',
        name: 'sub-menu',
        meta: {
            middleware: [auth,checkAuth]
        },
        component: () => import('../../views/pages/sub-menu/index'),
    },
];

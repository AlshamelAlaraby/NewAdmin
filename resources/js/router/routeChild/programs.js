import auth from "../../middleware/auth";
import checkAuth from "../../middleware/auth-check";

export default [
    {
        path: '/programs',
        name: 'programs',
        meta: {
            middleware: [auth,checkAuth]
        },
        component: () => import('../../views/pages/programs/index'),
    },
];

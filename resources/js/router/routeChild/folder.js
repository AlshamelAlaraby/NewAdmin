import auth from "../../middleware/auth";
import checkAuth from "../../middleware/auth-check";

export default [
    {
        path: '/folder',
        name: 'folder',
        meta: {
            middleware: [auth,checkAuth]
        },
        component: () => import('../../views/pages/folder/index'),
    },
];

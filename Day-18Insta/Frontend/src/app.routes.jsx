import { createBrowserRouter } from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <h1>Welecome To FOUR Layer Architecture of React</h1>
    }
    // {
    //     path: "/create-post",
    //     element: <CreatePost />
    // }
])
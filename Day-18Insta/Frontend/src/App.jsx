import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import { AuthProvider } from "./features/auth/auth.context"
import "./features/shared/global.scss"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <AuthProvider>
        <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App

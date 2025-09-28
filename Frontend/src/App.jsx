import React ,{useState} from 'react'
import Home from './Components/Home/Home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from './Components/About/About';
import NotFound from './Components/NotFound';
import PostLost from './Components/PostLostIteams/PostLost';
import PostFound from './Components/PostFound/PostFound';
import Login from './Components/Home/Login';
import Dashboard from './Components/Dashboard/dashboard';
import Signup from './Components/Home/Signup';
import { AuthStatus } from './Components/context';


const router = createBrowserRouter(
  [
    {path:"/",
    element:<Home/>
  },
  {path:"/About",
  element:<About />
},
{
  path:"/PostLost",
  element:<PostLost />
},
{
  path:"/PostFound",
  element:<PostFound />
},
{
  path:"/login",
  element:<Login />
},
{
  path:"/signup",
  element:<Signup />
},
{
  path:"/dashboard",
  element:<Dashboard />
},

{
  path:'*',
  element:<NotFound />
}
  ]
)
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthStatus.Provider value={{ isAuthenticated, setIsAuthenticated }}>
    <div>
       <RouterProvider router={router} />
    </div>
    </AuthStatus.Provider>
  )
}

export default App

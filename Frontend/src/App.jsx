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
import Dashboard from './Components/Dashboard/Dashboard';
import Signup from './Components/Home/Signup';
import { AuthStatus } from './Components/context';
import PrivateRoute from './Components/PrivateRoute';


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
  element:(
    <PrivateRoute>
      <PostLost />
    </PrivateRoute>
  )
},
{
  path: "/PostFound",
    element: (
      <PrivateRoute>
        <PostFound />
      </PrivateRoute>
    )
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
  element:(
  <PrivateRoute>
  <Dashboard />
  </PrivateRoute>
  )
},

{
  path:'*',
  element:<NotFound />
}
  ]
)
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token"); // true if token exists
  });
  return (
    <AuthStatus.Provider value={{ isAuthenticated, setIsAuthenticated }}>
    <div>
       <RouterProvider router={router} />
    </div>
    </AuthStatus.Provider>
  )
}

export default App

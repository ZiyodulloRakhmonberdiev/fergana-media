import React from "react";  // React'ni import qildik
import { RouterProvider } from 'react-router-dom';
import RoutesWrap from './routes/Route';
import './i18n'

function App() {
  const routes = RoutesWrap();
  
  return (
    <div className='app'>
      <RouterProvider router={routes}/>
    </div>
  );
}

export default App;

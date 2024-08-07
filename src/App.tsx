

import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context'
import { AppRoutes } from './routes'
import './styles/global.css'
import { RouteChangeListener } from './routerChangeListener'


function App() {

  return (


        <AppProvider>

            <BrowserRouter>
            
                  <AppRoutes />
                  <RouteChangeListener />
            
            </BrowserRouter>

        </AppProvider>



       
  )

}

export default App

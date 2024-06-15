




import { AppProvider } from './context'
import { AppRoutes } from './routes'
import './styles/global.css'



function App() {
 
  return (
    

      <main className="min-h-screen">

        <AppProvider>

            <AppRoutes />

        </AppProvider>
    
      </main>


       
  )

}

export default App

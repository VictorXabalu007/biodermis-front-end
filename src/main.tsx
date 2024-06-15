
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {QueryClientProvider} from '@tanstack/react-query'
import { queryClient } from './service/queryClient.ts';



ReactDOM.createRoot(document.getElementById('root')!).render(

  
  <QueryClientProvider client={queryClient}>

    <ConfigProvider 
      locale={ptBR}
      theme={{
        token: {
          colorPrimaryBorderHover: '#C882B7',
          

        },
        components: {
          Checkbox: {
            colorPrimary: '#C882B7',
          },
          Radio: {
            colorPrimary: '#C882B7',
          },
          DatePicker: {
            colorPrimary: '#C882B7'
          }
        }
        
      }}
      >
        
          <App /> 
      

    </ConfigProvider>

  </QueryClientProvider>

)

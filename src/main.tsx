
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
      >
        
          <App /> 
      

    </ConfigProvider>

  </QueryClientProvider>

)

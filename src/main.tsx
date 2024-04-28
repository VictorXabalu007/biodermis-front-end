
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import '@fortawesome/fontawesome-svg-core/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <ConfigProvider 
    locale={ptBR}
    >
      
        <App /> 
     

  </ConfigProvider>

)

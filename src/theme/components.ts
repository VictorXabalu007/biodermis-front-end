import { ComponentsToken } from 'antd/es/theme/context';
import { colors } from './colors';


export const components:ComponentsToken = {
    
    Typography: {
        titleMarginBottom: 0,
     
    },
    Flex: {
        padding: 16,
    },
    Checkbox: {
        colorPrimary: colors.primaryPurple,
        colorPrimaryHover: '#C882B770'
      },
      Radio: {
        colorPrimary:  colors.primaryPurple,
      },
      DatePicker: {
        colorPrimary:  colors.primaryPurple
      },
      Button: {
        colorBgContainer: colors.primaryPurple,
        defaultColor: colors.white,
        defaultHoverBg: colors.white
      },
      Input: {
        colorPrimaryBorderHover:  colors.primaryPurple,
        activeBorderColor:  colors.primaryPurple
      },

   
}
import { colors } from "../../../theme/colors";


export const getColorStylesByKey  = (key:string) => {


    switch(key){
        case '1':
            
            return {border: `1px solid ${colors.primaryPurple}`, background: '#FAF3F8'};
        case '2':
            return {border: `1px solid ${colors.brandGreen2}`, background: '#D8F3DC66'};
  
        case '3': 
            return {border: `1px solid ${colors.yellow}`, background: '#FFF8D7'};
           
    } 

}
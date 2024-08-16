import { GREEN_700, PURPLE_600, YEALLOW_700 } from "../../../constants/classnames/classnames";



export const getColorStylesByKey  = (key:string) => {


    switch(key){
        case '1':
            
            return {border: `1px solid ${PURPLE_600}`, background: '#FAF3F8'};
        case '2':
            return {border: `1px solid ${GREEN_700}`, background: '#D8F3DC66'};
  
        case '3': 
            return {border: `1px solid ${YEALLOW_700}`, background: '#FFF8D7'};
           
    } 

}
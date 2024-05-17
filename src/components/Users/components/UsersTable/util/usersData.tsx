import { UserTypeRole } from "../../TableHeader/util/selectOptions"
import { UserType } from "./@types/UserType"


export type Users = {

    name: string,
    email: string,
    phone: string,
    userType: UserType,
    actions : React.ReactNode,

}

// isso pode ser temporário por conta do UserRole

export const usersData: Users[] = [

    {
    
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        userType: UserTypeRole.USER,
        actions: <></>
    },
    {
      
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        userType: UserTypeRole.CONSULTOR,
        actions: <></>
    },
    {
        
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        userType:UserTypeRole.USER,
        actions: <></>
    },
    {
  
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        userType: UserTypeRole.USER,
        actions: <></>
    },
    {
  
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        userType: UserTypeRole.USER,
        actions: <></>
    },
    {
      
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        userType: UserTypeRole.USER,
        actions: <></>
    },
    {
       
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        userType: UserTypeRole.CONSULTOR,
        actions: <></>
    },
    {
    
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        userType: UserTypeRole.USER,
        actions: <></>
    },
    {
    
        name: 'Macucu',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        userType: UserTypeRole.CONSULTOR,
        actions: <></>
    },
    {
      
        name: 'Leonardo Mazzuca',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        userType: UserTypeRole.USER,
        actions: <></>
    },

]
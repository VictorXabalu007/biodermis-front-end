


export const getFormaPag = (id:number) => {
    

        switch(id) {
          case 2:
            return 'Cartão de crédito'
          case 1:
            return 'Pix'
          case 3:
            return 'Cartão de débito'
          case 4:
            return 'Boleto'
        default: 
            return'Forma de pagamento não indentificada'
    
        }
      
}
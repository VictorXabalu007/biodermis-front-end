

type NumericFormatterProps = {
    value : number
}

export const NumericFormatter = ({value}:NumericFormatterProps) => {

        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          maximumFractionDigits: 2,
        }).format(value);

}
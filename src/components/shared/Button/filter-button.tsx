


import { Button, ButtonProps, Tooltip } from 'antd'
import { TbFilterCancel } from 'react-icons/tb'

type Props = {
    isFiltered:boolean
    onFilterCancel: () => void
} & ButtonProps

const FilterButton = ({isFiltered,onFilterCancel,...rest}:Props) => {
  return (
    <Tooltip 
    trigger={'hover'}
    title={isFiltered ? 'Cancelar filtro' : 'filtre para poder cancelar os filtros'}>

    <Button 
    disabled={!isFiltered}
    onClick={onFilterCancel}
    size='large'
    {...rest}
    >
        <TbFilterCancel /> 
    </Button>

    </Tooltip>
  )
}

export default FilterButton

import ReactSelect, { Props } from 'react-select';

const Select = (props: Props<any>) => (
  
  <ReactSelect
    {...props}
    placeholder="selecione"
    styles={{
      control: provided => ({
        ...provided,
        padding: '2px 0',
        width: 'auto',
      }),
      ...props.styles,
    }}
    theme={theme => ({
      ...theme,
      borderRadius: 5,
      colors: {
        ...theme.colors,
        text: 'orangered',
        primary25: '#B475A5',
        primary: '#C882B7',
      },
      ...props.theme,
    })}
  />
);

export default Select;
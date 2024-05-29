

import S, {Props} from 'react-select';


const Select: React.FC<Props<any>> = (props) => (
    <S
      {...props}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: 'hotpink',
          primary: 'black',
        },
      })}
    />
  );
  
 export default Select;
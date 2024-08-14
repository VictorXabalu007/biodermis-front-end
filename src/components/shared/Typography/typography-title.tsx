

import { Typography } from 'antd'
import { TitleProps } from 'antd/es/typography/Title'


const Title = ({children,...rest}:TitleProps) => {
  return (
    <Typography.Title
        {...rest}
    >
        {children}
    </Typography.Title>
  )
}

export default Title
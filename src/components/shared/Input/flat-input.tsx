import { Input, InputProps, InputRef } from 'antd';
import { twMerge } from 'tailwind-merge';
import React from 'react';
import InputMoney, { InputMoneyProps } from './InputNumber';

type InputMode = 'money' | 'default' | 'number';

type Props = {
    inputType: InputMode;
} & (InputProps | InputMoneyProps);

const FlatInput = React.forwardRef<HTMLInputElement | null, Props>(
  ({ className, inputType = 'default', ...rest }, ref) => {
    return (
      <>
        {inputType === 'default' && (
          <Input
            className={twMerge(
              'bg-transparent text-md placeholder-gray-neutral-600 p-0 border-b-1 border-gray-neutral-200 text-gray-neutral-600 border-l-0 border-r-0 border-t-0 w-full',
              className
            )}
            ref={ref as React.LegacyRef<InputRef>}
            {...(rest as InputProps)}
          />
        )}

        {inputType === 'money' && (
          <InputMoney
            type="number"
            className={twMerge(
              'bg-transparent text-md placeholder-gray-neutral-600 p-0 border-b-1 border-gray-neutral-200 text-gray-neutral-600 border-l-0 border-r-0 border-t-0 w-full',
              className
            )}
            {...(rest as InputMoneyProps)}
          />
        )}

        {inputType === 'number' && (
          <Input
            type="number"
            className={twMerge(
              'bg-transparent text-md placeholder-gray-neutral-600 p-0 border-b-1 border-gray-neutral-200 text-gray-neutral-600 border-l-0 border-r-0 border-t-0 w-full',
              className
            )}
            ref={ref as React.RefObject<InputRef>}
            {...(rest as InputProps)}
          />
        )}
      </>
    );
  }
);

export default FlatInput;

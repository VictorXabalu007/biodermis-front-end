import { Form, Input, Select, SelectProps } from "antd";
import { InputProps } from "antd/lib";
import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";
import { Options } from "../@types/Options/Options";
import InputMoney from "../components/shared/Input/input-money";



export const renderFormField = <T extends FieldValues,>(
  
    fieldName: Path<T>,
    label: string,
    control:Control<T,any>,
    errors:FieldErrors<T>,
    fieldType?: "text" | "number" | "select" | "pattern" | "money",

) => (

    
    <Controller
    control={control}
    name={fieldName as Path<T>}
    render={({ field }) => {
      const errorMessage = errors[fieldName]?.message;
      switch (fieldType) {
        case "number":
          return (
            <Form.Item
              label={label}
              validateStatus={errorMessage ? "error" : ""}
              help={errorMessage as string}
            >
              <Input 
                type="number" 
                
                {...field}
               />
            </Form.Item>
          );
        case "select":
          return (
            <Form.Item
              label={label}
              validateStatus={errorMessage ? "error" : ""}
              help={errorMessage as string}
            >
              <Select {...field} />
            </Form.Item>
          );

        case "money":
          return (
            <Form.Item
            label={label}
            validateStatus={errorMessage ? "error" : ""}
            help={errorMessage as string}
          >
            <InputMoney  
              value={parseFloat(field.value)}
              onChange={(e)=> {
                
                if(e.target.value === '.'){
                  field.onChange('')
                } else {
                  field.onChange(e.target.value)
                }
                
              }}
              isFlat={false}
             />
          </Form.Item>
          )
        default:
          return (

            <Form.Item
              label={label}
              validateStatus={errorMessage ? "error" : ""}
              help={errorMessage as string}
            >
              <Input {...field} />
            </Form.Item>

          );
      }
    }}

  />

)

type RenderFormFieldMaks<T extends FieldValues> = {
    fieldName: Path<T>,
    label: string,
    control:Control<T,any>,
    errors:FieldErrors<T>
} & InputProps

export const renderMaskFormField = <T extends FieldValues,>({
    fieldName,
    label,
    control,
    errors,
    onChange,
    value,
  }:RenderFormFieldMaks<T>) => {
    const errorMessage = errors[fieldName]?.message;
  
    return (
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <Form.Item
            validateStatus={errorMessage ? "error" : ""}
            help={errorMessage as string}
            label={label}
          >
            <Input 
               {...field}
              onChange={(e)=> {
                field.onChange(e.target.value)
                onChange?.(e)
              }}
              value={value}
           
       
            />
          </Form.Item>
        )}
      />
    );
  };

type RenderSelectFieldProps<T extends FieldValues> = {
  fieldName: Path<T>,
  label: string,
  control:Control<T,any>,
  errors:FieldErrors<T>,
  options: Options[],
} & SelectProps

export const renderSelectField = <T extends FieldValues>(
{
  control,
  errors,
  fieldName,
  label,
  options,
  ...rest
}:RenderSelectFieldProps<T>) => (
    <Controller
    control={control}
    name={fieldName as Path<T>}
    render={({ field }) => {
      const errorMessage = errors[fieldName]?.message;
      return (
        <Form.Item
          label={label}
          validateStatus={errorMessage ? "error" : ""}
          help={errorMessage as string}
        >
          <Select {...rest} {...field} options={options} />
        </Form.Item>
      );
    }}
  />
)
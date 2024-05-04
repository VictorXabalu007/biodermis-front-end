type InputType = "input" | "inputNumber";

export type InputData = {

  label: string;
  inputId: string;
  placeholder: string;
  value: string;
  inputType: InputType;
  width?:string

};
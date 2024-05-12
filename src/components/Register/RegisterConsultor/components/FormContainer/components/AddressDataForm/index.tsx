import { PatternFormat } from "react-number-format";
import { RegisterFieldProps } from "../../../../../@types/RegisterFieldsProps";
import { Controller } from "react-hook-form";
import { Form } from "../../../../../../shared/Form";
import { Input } from "../../../../../../shared/Input/Input";
import { ConsultorsData } from "../..";

export const AddressDataForm = ({ errors, control }: RegisterFieldProps<ConsultorsData>) => {

  return (

    <Form.GroupWrapper>
      
        <Form.SubHeader 
        heading="Endereço"
        subtext="Informe o endereço do novo consultor"
        />

      <Form.Group>

        <Form.InputWrapper >


            <Controller 
            control={control}
            name="address"
            render={({field})=> {
              return (
                <Input.Root>

                  <Input.Label 
                  content="Endereço"
                  className="text-black"
                  htmlFor="address"
                  />
                  <Input.System 
                  placeholder="Rua tal Bairro tal"
                  onChange={(e)=> {
                    field.onChange(e.target.value)
                  }}
                  id="address"
                  />

                {errors.address && (
                  <small className="mt-1 text-red-600">{errors.address?.message}</small>
                )}  
                
                </Input.Root>

              )}}

            />

        </Form.InputWrapper >

        <Form.InputWrapper >
          <label>CEP</label>

          <Controller
            name="cep"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <>
                  <PatternFormat
                    format="#####-###"
                    allowEmptyFormatting
                    mask="_"
                    className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                    onChange={(cep) => {
                      field.onChange(cep);
                    }}
                  />

                  <>
                    {errors.cep && (
                      <p className="text-red-600">{errors.cep.message}</p>
                    )}
                  </>
                </>
              );
            }}
          />
        </Form.InputWrapper >

        <Form.InputWrapper >

        <Controller 
            control={control}
            name="street"
            render={({field})=> {
              return (
                <Input.Root>

                  <Input.Label 
                  content="Rua"
                  className="text-black"
                  htmlFor="street"
                  />
                  <Input.System 
                  placeholder="Rua tal"
                  onChange={(e)=> {
                    field.onChange(e.target.value)
                  }}
                  id="street"
                  />

                {errors.street && (
                  <small className="mt-1 text-red-600">{errors.street?.message}</small>
                )}  
                
                </Input.Root>

              )}}

            />
        </Form.InputWrapper >

        <Form.InputWrapper >

          <Controller 
            control={control}
            name="neighborhood"
            render={({field})=> {
              return (
                <Input.Root>

                  <Input.Label 
                  content="Bairro"
                  className="text-black"
                  htmlFor="neighborhood"
                  />
                  <Input.System 
                  placeholder="Bairro tal"
                  onChange={(e)=> {
                    field.onChange(e.target.value)
                  }}
                  id="neighborhood"
                  />

                {errors.neighborhood && (
                  <small className="mt-1 text-red-600">{errors.neighborhood?.message}</small>
                )}  
                
                </Input.Root>

              )}}

            />
        </Form.InputWrapper >

        <Form.InputWrapper >
          
        <Controller 
            control={control}
            name="city"
            render={({field})=> {
              return (
                <Input.Root>

                  <Input.Label 
                  content="Cidade"
                  className="text-black"
                  htmlFor="city"
                  />
                  <Input.System 
                  placeholder="Cidade tal"
                  onChange={(e)=> {
                    field.onChange(e.target.value)
                  }}
                  id="city"
                  />

                {errors.city && (
                  <small className="mt-1 text-red-600">{errors.city?.message}</small>
                )}  
                
                </Input.Root>

              )}}

            />
        </Form.InputWrapper >

        <Form.InputWrapper >

           <Controller 
           
            control={control}
            name="number"
            render={({field})=> {
              return (
                <Input.Root>

                  <Input.Label 
                  content="Número"
                  className="text-black"
                  htmlFor="number"
                  />
                  <Input.System 
                  placeholder="0000"
                  onChange={(e)=> {
                    field.onChange(e.target.value)
                  }}
                  id="number"
                  type="number"
                  />

                  {errors.number && (
                    <small className="mt-1 text-red-600">{errors.number?.message}</small>
                  )}  
                
                </Input.Root>

              )}}

            />
        </Form.InputWrapper >

        <Form.InputWrapper>
          
          <Controller 
           
           control={control}
           name="complement"
           render={({field})=> {
             return (
               <Input.Root>

                 <Input.Label 
                 content="Complemento"
                 className="text-black"
                 htmlFor="complement"
                 />
                 <Input.System 
                 placeholder="0000"
                 onChange={(e)=> {
                   field.onChange(e.target.value)
                 }}
                 id="complement"
                 type="number"
                 />

                 {errors.complement && (
                   <small className="mt-1 text-red-600">{errors.complement?.message}</small>
                 )}  
               
               </Input.Root>

             )}}

           />

        </Form.InputWrapper >

      </Form.Group>

    </Form.GroupWrapper>

  );

};

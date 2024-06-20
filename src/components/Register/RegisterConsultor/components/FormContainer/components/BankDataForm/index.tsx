import { Controller } from "react-hook-form";
import { RegisterFieldProps } from "../../../../../@types/RegisterFieldsProps";
import { usePixkey } from "../../../../../../../hooks/usePixkey";
import { Form } from "../../../../../../shared/Form";
import { Input } from "../../../../../../shared/Input/Input";
import { UserData } from "../..";
import { Form as AntdForm } from "antd";
import Select from "../../../../../../shared/Input/Select";
import { useEffect, useState } from "react";
import { BANK_OPS } from "../../../../../../../constants/SessionStorageKeys/sessionStorageKeys";
import { Options } from "../../../../../../../@types/Options/Options";

const Item = AntdForm.Item;

export const BankDataForm = ({ errors, control }: RegisterFieldProps<UserData>) => {
  const bankOps: Options[] = JSON.parse(sessionStorage.getItem(BANK_OPS) ?? '[]') || [];

  const { pixKey, handlePixkeyChange } = usePixkey();

  const [defaultSelected, setDefaultSelected] = useState<Options[]>([]);

  const [bankOptions, setBankOptions] = useState<Options[]>(bankOps);

  const handleCodeBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) {
      setDefaultSelected([]);
      setBankOptions(bankOps);
      return;
    }

    const defaultIndex = bankOps.find(b => b.key === parseInt(value));

    if (defaultIndex) {
      setDefaultSelected([defaultIndex]);
      setBankOptions([defaultIndex]);
    }

  };

  useEffect(() => {
    if (defaultSelected.length === 0) {
      setBankOptions(bankOps);
    } else {
      setBankOptions(defaultSelected)
    }
  }, [defaultSelected]);

  return (
    <Form.GroupWrapper>
      <Form.SubHeader 
        heading="Dados bancários"
        subtext="Informe os dados bancários do novo usuário"
      />

      <Form.Group>
        <Controller 
          name="bankData.cod_banco"
          control={control}
          render={({ field: { onChange, name } }) => (
            <Item
              name={name}
              validateStatus={errors?.bankData?.cod_banco ? 'error' : 'success'}
              help={errors?.bankData?.cod_banco && errors.bankData.cod_banco.message}
              hasFeedback
            >
              <Form.InputWrapper>
                <label>Código do banco</label>
                <Input.System 
                  placeholder="000"
                  onChange={e => {
                    onChange(e);
                    handleCodeBankChange(e);
                  }}
                  id="number"
                  type="number"
                  maxLength={3}
                /> 
              </Form.InputWrapper>
            </Item>
          )}
        />

        <Controller 
          name="bankData.conta"
          control={control}
          render={({ field: { onChange, name } }) => (
            <Item
              name={name}
              validateStatus={errors?.bankData?.conta ? 'error' : 'success'}
              help={errors?.bankData?.conta && errors.bankData.conta.message}
              hasFeedback
            >
              <Form.InputWrapper>
                <label>Número da Conta</label>
                <Input.System 
                  placeholder="0000"
                  onChange={onChange}
                  id="number"
                  type="number"
                /> 
              </Form.InputWrapper>
            </Item>
          )}
        />

        <Controller 
          control={control}
          name="bankData.agencia"
          render={({ field: { onChange, name } }) => (
            <Item
              name={name}
              validateStatus={errors?.bankData?.agencia ? 'error' : 'success'}
              help={errors?.bankData?.agencia && errors.bankData.agencia.message}
              hasFeedback
            >
              <Form.InputWrapper>
                <Input.Root>
                  <Input.Label 
                    content="Agência"
                    className="text-black"
                    htmlFor="agency"
                  />
                  <Input.System 
                    placeholder="0000"
                    onChange={onChange}
                    id="agency"
                  /> 
                </Input.Root>
              </Form.InputWrapper>
            </Item>
          )}
        />

        <Controller 
          control={control}
          name="bankData.pix"
          render={({ field: { onChange, name, value } }) => (
            <Item
              name={name}
              validateStatus={errors?.bankData?.pix ? 'error' : 'success'}
              help={errors?.bankData?.pix && errors.bankData.pix.message}
              hasFeedback
            >
              <Form.InputWrapper>
                <Input.Root>
                  <Input.Label 
                    content="Chave pix"
                    className="text-black"
                    htmlFor="pixkey"
                  />
                  <Input.System 
                    placeholder="123"
                    onChange={e => {
                      onChange(e.target.value);
                      handlePixkeyChange(e);
                    }}
                    value={value}
                    onBlur={() => {
                      onChange(pixKey);
                    }}
                    id="pixkey"
                  />
                </Input.Root>
              </Form.InputWrapper>
            </Item>
          )}
        />

        <Controller 
          control={control}
          name="bankData.banco"
          render={({ field: { onChange, name } }) => (
            <Item
              name={name}
              validateStatus={errors?.bankData?.banco ? 'error' : 'success'}
              help={errors?.bankData?.banco && errors.bankData.banco.message}
              hasFeedback
            >
              <Form.InputWrapper>
                <Input.Root>
                  <Input.Label 
                    content="Banco"
                    className="text-black"
                    htmlFor="bank"
                  />
                  <Select 
                    options={bankOptions}
                    onChange={e => {
                      onChange(e.value);
                    }}
                    isSearchable
                  />
                </Input.Root>
              </Form.InputWrapper>
            </Item>
          )}
        />
      </Form.Group>
    </Form.GroupWrapper>
  );
};

import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { BsDownload } from 'react-icons/bs';
import { Controller } from 'react-hook-form';
import { RegisterFieldProps } from '../../../../../@types/RegisterFieldsProps';
import { Form } from '../../../../../../shared/Form';
import { UserData } from '../..';
import { FormItem } from '../../../../../../shared/Form/FormItem';
import { DraggerWrapper } from './styles/styles';


const { Dragger } = Upload;


const props: UploadProps = {
  name: 'file',
  multiple: false,
  accept: '.pdf',
  beforeUpload: () => {
  
    return false;
    
  },
  

};


export const Uploader = ({control,errors}:RegisterFieldProps<UserData>) => {
    







    return (
      <div className="mt-10">
        <Form.SubHeader heading="Upload de certificado" subtext="Faça o upload do certificado do novo consultor" />
  
        <div className="mt-10">
          <Controller
            name="certificado"
            control={control}
            render={({ field }) => (
              <FormItem
                name="certificado"
                validateStatus={errors.certificado ? 'error' : 'success'}
                help={errors.certificado && errors.certificado.message}
                hasFeedback
              >
                <DraggerWrapper>
                  <Dragger
                    style={{
                      background: '#FAF3F8',
                      borderColor: '#B475A5',
                      padding: '1rem',
                    }}
                    onChange={(info) => {
                      field.onChange(info.fileList)
                    }}
                    {...props}
                  >
                    <p className="uploader-icon flex justify-center items-center">
                      <BsDownload />
                    </p>
                    <p className="py-4 font-[400]">
                      Clique ou arraste o arquivo nesta área para{' '}
                      <span className="mx-1 font-bold">realizar upload</span>
                    </p>
                  </Dragger>
                </DraggerWrapper>
              </FormItem>
            )}
          />
        </div>
      </div>
    );
}
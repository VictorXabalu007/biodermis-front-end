import type { UploadFile, UploadProps } from 'antd';
import {  Upload } from 'antd';
import { BsDownload } from 'react-icons/bs';
import { Controller } from 'react-hook-form';
import { ProductsData } from '../FormContainer';
import { Form } from '../../../../shared/Form';
import { RegisterFieldProps } from '../../../@types/RegisterFieldsProps';
import { GetProp } from 'antd/lib';
import { Ref, forwardRef, useImperativeHandle, useState } from 'react';
import { FormItem } from '../../../../shared/Form/FormItem';
import { UploaderWrapper } from './styles';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { Dragger } = Upload;

const props: UploadProps = {
    
  name: 'files',
  multiple: true,
  accept: "image/png, image/jpeg, image/jpg",


  beforeUpload: () => {
    
    return false;
    
  },
  listType: 'picture-card',
  
  

};



const UploaderComponent = ({ control, errors }: RegisterFieldProps<ProductsData>, ref: Ref<any>) => {


      const [fileList, setFileList] = useState<UploadFile[]>([]);
      
      const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };
      
    
      const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj as FileType);
            reader.onload = () => resolve(reader.result as string);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
        
      };

      
    useImperativeHandle(ref, () => ({
      resetFiles: () => setFileList([]),
    }));


    return (

        <Form.GroupWrapper>
        <Form.SubHeader 
          heading="Imagens do produto" 
          subtext="Faça o upload das imagens do produto"
           />
        <Form.GroupWrapper>
          <Controller
            name="files"
            rules={{required: true}}
            control={control}
            render={({ field }) => (
              <UploaderWrapper>
                <FormItem
                  name="files"
                  validateStatus={errors.files ? 'error' : 'success'}
                  help={errors.files && errors.files.message}
                  hasFeedback
                >
                  <Dragger
                    fileList={fileList}
                    style={{
                      background: '#FAF3F8',
                      borderColor: '#B475A5',
                      padding: '1rem',
                    }}
                    onChange={(info) => {
                      onChange(info);
                      console.log(info);
                      
                      field.onChange(info.fileList);
                    }}
                    onPreview={onPreview}
                    listType="picture-card"
                    {...props}
                  >
                    <p className="uploader-icon flex justify-center items-center">
                      <BsDownload />
                    </p>
                    <p className="py-4 font-[400]">
                      Clique ou arraste o arquivo nessa área para
                      <span className="mx-1 font-bold">realizar upload</span>
                    </p>
                  </Dragger>
                </FormItem>
              </UploaderWrapper>
            )}

          />
        </Form.GroupWrapper>
      </Form.GroupWrapper>

    );
}

export const Uploader = forwardRef(UploaderComponent);
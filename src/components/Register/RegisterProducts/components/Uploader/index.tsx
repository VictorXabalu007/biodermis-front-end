import type { UploadFile, UploadProps } from 'antd';
import {  Upload } from 'antd';
import styled from 'styled-components';
import { BsDownload } from 'react-icons/bs';
import { Controller } from 'react-hook-form';
import { ProductsData } from '../FormContainer';
import { Form } from '../../../../shared/Form';
import { RegisterFieldProps } from '../../../@types/RegisterFieldsProps';
import { GetProp } from 'antd/lib';
import { useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  accept: "image/png, image/jpeg, image/jpg",
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
  
  beforeUpload: () => {
    
    return false;
    
  },
  

};


export const Uploader = ({control,errors}:RegisterFieldProps<ProductsData>) => {


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

    const Wrapper = styled.div`
        
        width: 100%;
        display:flex;
        flex-direction:column;
        gap: 1em; 

        
        .ant-upload-wrapper .ant-upload-list{
            overflow-x: scroll !important;
        }

        .uploader-icon svg {
            fill : #B475A5 !important;
            transform: rotate(180deg);
            width:50px;
            height:30px;
        }

        .ant-upload-list-item-actions .anticon-delete svg {
            fill:#FF4D4F;
        }

        .ant-upload-list .ant-upload-list-picture-card {
            overflow: scroll !important;
        }

        .ant-upload-list {
            margin-top: 1em;
          
        }

        .ant-upload-list-item-container{
            width: 200px !important;
        }
    `;

    return (

         <Form.GroupWrapper>

                    <Form.SubHeader 
                    heading='Imagens do produto'
                    subtext='Faça o upload das imagens do produto'
                    />

                    <Form.GroupWrapper>

                        <Controller
                        name='productsImage'
                        control={control}
                        render={({field})=> {

                        return (
                        
                            <>
                            
                            
                        <Wrapper>  

                            <Dragger 
                            fileList={fileList}
                            style={{
                         
                                background: '#FAF3F8',
                                borderColor: '#B475A5',
                                padding: '1rem'
                                
                            }}
                            onChange={(info)=> {
                                onChange(info)
                                field.onChange(info.fileList)
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
                                    <span className='mx-1 font-bold'>realizar upload</span>
                                </p>

                            </Dragger>

                            
                            </Wrapper>

                            <>
                                {errors.productsImage && (
                                    <small className="text-red-600">
                                            {errors.productsImage.message} 
                                    </small>
                                )}

                            </>

                        </>


                            )
                        }}
                        
                        />



                    </Form.GroupWrapper>


        </Form.GroupWrapper>

    );
}
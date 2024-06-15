import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
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
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
 
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
  
  beforeUpload: () => {
  
    return false;
    
  },
  


};


export const Uploader = ({control,errors}:RegisterFieldProps<UserData>) => {



    return (

         <div className="mt-10">

                    <Form.SubHeader 
                    heading='Upload de certificado'
                    subtext='Faça o upload do certificado do novo consultor'
                    />

                    <div
                    className='mt-10'
                    >

                        <Controller
                        name='certificado'
                        control={control}
                        render={({field})=> {

                        return (

                        <FormItem
                        name='certificated'
                        validateStatus={errors.certificado ? 'error' : 'success'}
                        help={errors.certificado && errors.certificado.message}
                        hasFeedback
                        >

                            <DraggerWrapper>   
                                <Dragger 
                        
                                style={{
                            
                                    background: '#FAF3F8',
                                    borderColor: '#B475A5',
                                    padding: '1rem'
                                }}
                                onChange={(info)=> {
                                    const { status } = info.file;
                                    if (status !== 'uploading') {
                                    console.log(info.file, info.fileList);
                                    }
                                    if (status === 'done') {
                                    message.success(`${info.file.name} file uploaded successfully.`);
                                    } else if (status === 'error') {
                                    message.error(`${info.file.name} file upload failed.`);
                                    }
                                    field.onChange(info.file)
                                }}
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
                                
                                </DraggerWrapper>



                        </FormItem>



                            )
                        }}
                        
                        />



                    </div>


                </div>

    );
}
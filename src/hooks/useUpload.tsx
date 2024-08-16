import { Flex, UploadFile, UploadProps } from "antd"
import { GetProp } from "antd/lib";
import { useEffect, useState } from "react"
import { API_URL } from "../service/url";
import { FaPlus } from "react-icons/fa6";
import { colors } from "../theme/colors";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type Props = {
    initialImage?: string[]
}

export const useUpload = ({initialImage}:Props) => {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });



    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {

        if (initialImage && initialImage.length > 0) {
          setFileList(
            initialImage.map((image) => ({
              url: API_URL + "/" + image,
              uid: image,
              name: image,
              status: 'done',
            }))
          )
        }
    
      }, [initialImage])


    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);

    };

    const handleUpload: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }

    const handleRemove = async (file: UploadFile) => {
        setFileList(prevFileList => prevFileList.filter(item => item.uid !== file.uid));
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          
          <Flex 
            vertical
            align="center"
            gap={5}

          >
            <FaPlus color={colors.primaryPurple} size={15} />
          <div style={{ marginTop: 8 }}>Adicionar imagem</div>
          </Flex> 
        
        </button>
      );

    return {
        fileList,
        getBase64,
        previewOpen,
        previewImage,
        handlePreview,
        handleUpload,
        handleRemove,
        uploadButton,
        setPreviewOpen,
        setPreviewImage,
        setFileList
    }
}
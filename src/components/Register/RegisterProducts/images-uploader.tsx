import type { UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";
import { BsDownload } from "react-icons/bs";
import { Controller } from "react-hook-form";
import { Form } from "../../shared/Form";
import { GetProp } from "antd/lib";
import { Ref, forwardRef, useImperativeHandle, useState } from "react";
import { FormItem } from "../../shared/Form/FormItem";
import { RcFile } from "antd/es/upload";
import { ProductsData } from "../../../validations/registerProductValidation";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const { Dragger } = Upload;

const props: UploadProps = {
	name: "files",
	multiple: true,
	accept: "image/png, image/jpeg, image/jpg",

	beforeUpload: (file: RcFile) => {
		const isValidType = ["image/png", "image/jpeg", "image/jpg"].includes(
			file.type,
		);
		const isValidExtension = /\.(png|jpe?g)$/i.test(file.name);

		if (!isValidType || !isValidExtension) {
			message.error("Faça upload apenas de arquivos PNG, JPEG, ou JPG!");
			return Upload.LIST_IGNORE;
		}
		return false;
	},
	listType: "picture-card",
};

const UploaderComponent = (
	{ control, errors }: RegisterFieldProps<ProductsData>,
	ref: Ref<any>,
) => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
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
					rules={{ required: true }}
					control={control}
					render={({ field }) => (
						<FormItem
							name="files"
							validateStatus={errors.files ? "error" : "success"}
							help={errors.files && errors.files.message}
						>
							<Dragger
								fileList={fileList}
								style={{
									background: "#FAF3F8",
									borderColor: "#B475A5",
									padding: "1rem",
									marginBottom: "15px",
								}}
								onChange={(info) => {
									onChange(info);
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
					)}
				/>
			</Form.GroupWrapper>
		</Form.GroupWrapper>
	);
};

export const Uploader = forwardRef(UploaderComponent);

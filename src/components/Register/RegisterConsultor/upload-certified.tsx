import type { UploadProps } from "antd";
import { Form, Upload } from "antd";
import { BsDownload } from "react-icons/bs";
import { Controller } from "react-hook-form";
import type { UserData } from "../../../validations/registerUserValidation";
import { SubHeader } from "../../shared/SubHeader/sub-header";
import { colors } from "../../../theme/colors";

const { Dragger } = Upload;

const props: UploadProps = {
	name: "file",
	multiple: false,
	accept: ".pdf",
	beforeUpload: () => {
		return false;
	},
};

export const Uploader = ({ control, errors }: RegisterFieldProps<UserData>) => {
	return (
		<div className="mt-10">
			<SubHeader
				heading="Upload de certificado"
				hasLink={false}
				style={{
					color: colors.primaryPurple,
				}}
				subtext="Fazer o upload do certificado do novo consultor"
			/>

			<div className="mt-10">
				<Controller
					name="certificado"
					control={control}
					render={({ field }) => (
						<Form.Item
							name="certificado"
							validateStatus={errors.certificado ? "error" : "success"}
							help={errors.certificado?.message}
							hasFeedback
						>
							<Dragger
								style={{
									background: "#FAF3F8",
									borderColor: "#B475A5",
									padding: "1rem",
								}}
								onChange={(info) => {
									field.onChange(info.fileList);
								}}
								{...props}
							>
								<p className="uploader-icon flex justify-center items-center">
									<BsDownload color={colors.primaryPurple} size={25} />
								</p>
								<p className="py-4 font-[400]">
									Clique ou arraste o arquivo nesta área para{" "}
									<span className="mx-1 font-bold">realizar upload</span>
								</p>
							</Dragger>
						</Form.Item>
					)}
				/>
			</div>
		</div>
	);
};

import { ReactNode, useEffect } from "react";
import { S as Sider } from "./sider";
import { Root } from "./root";
import { Content } from "./content";
import { Header } from "./header";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

type LayoutProps = {
	children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
	const navigate = useNavigate();
	const verifyLogin = () => {
		const email = sessionStorage.getItem("email");
		if (!email) {
			navigate(-1);
			notification.error({
				message: "Você não pode entrar sem não estar logado!",
			});
		}
	};

	useEffect(() => {
		verifyLogin();
	}, []);

	return (
		<Root>
			<Sider />

			<Root>
				<Header />

				<Content>{children}</Content>
			</Root>
		</Root>
	);
};

import { Content as C } from "antd/es/layout/layout";
import { ReactNode, useEffect, useState } from "react";

export const Content = ({ children }: { children: ReactNode }) => {
	const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setInnerWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [innerWidth]);

	return (
		<C
			style={{
				margin: "2.3em 16px 0",
				marginLeft: innerWidth && innerWidth < 762 ? 0 : "230px",
				padding: "1rem",
			}}
		>
			<div
				className="p-[0 24px]"
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "2em",
				}}
			>
				{children}
			</div>
		</C>
	);
};

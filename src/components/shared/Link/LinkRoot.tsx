
import { ReactNode } from "react";
import { Link} from "react-router-dom";
import { twMerge } from "tailwind-merge";

type LinkRootProps = {
    children: ReactNode;
    path: string;
    className? : string
}

export const LinkRoot = ({children, path, className} : LinkRootProps) => {

    return (

        <Link className={twMerge('text-center', className)} to={path}>
            {children}
        </Link>

    )


}
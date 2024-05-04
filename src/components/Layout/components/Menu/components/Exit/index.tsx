import { FaArrowRightFromBracket } from "react-icons/fa6"
import { Link } from "../../../../../shared/Link"



export const Exit = () => {

    return (

        <Link.Root className="p-[1.7rem] mt-24 text-brand-purple flex items-center justify-start gap-2" path="">

            <Link.Icon icon={FaArrowRightFromBracket} />
            <Link.Content content="Sair" />

        </Link.Root>
    );
}
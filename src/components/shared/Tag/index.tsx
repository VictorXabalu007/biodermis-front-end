

import { Tag as T } from "antd";
import { IoEllipse } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import AntdTag from 'antd/lib/tag'

interface TagProps extends  React.ComponentProps<typeof AntdTag> {

    content: string;
    key: string;
    className: string;

}

export const Tag = ({content, key, className, ...rest} : TagProps) => {

    return (
    <T {...rest} className={twMerge("border-none py-0.5 px-2", className)} key={key}>


        <div className="flex gap-2 font-semibold items-center">
            <IoEllipse className={className} />
            {content}
        </div>

     
    </T>)
}
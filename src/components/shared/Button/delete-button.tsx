import { Button, Popconfirm, theme, Tooltip } from "antd";
import { ButtonProps } from "antd/lib";
import { MouseEvent } from "react";
import { BsTrash } from "react-icons/bs";

type Props = {
    onDelete: () => void;
} & ButtonProps;

const DeleteButton = ({ onDelete, title, ...rest }: Props) => {
    const { token } = theme.useToken();

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();  
    };

    return (
        <Tooltip title={title ?? 'Deletar'}>
            <Popconfirm
                onConfirm={(e)=> {
                    e?.stopPropagation()
                    onDelete()
                }}
                title="Confirmar deleção"
                okText="Sim"
                cancelText="Não"
                onCancel={(e)=>e?.stopPropagation()}
            >
                <Button
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        border: `1px solid ${token.colorError}`,
                        borderRadius: '4px',
                        padding: '.3em',
                    }}
                    {...rest}
                    className='group hover:opacity-[0.5]'
                    size="small"
                    onClick={handleClick} 
                >
                    <BsTrash color={token.colorError} />
                </Button>
            </Popconfirm>
        </Tooltip>
    );
};

export default DeleteButton;

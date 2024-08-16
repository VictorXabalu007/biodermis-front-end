import { Empty, Flex, Image, Skeleton, Typography } from "antd";
import { capitalizeFirstLetter } from "../../functions/Capitalizer/capitalizeFirstLetter";
import { NumericFormatter } from "../shared/Formatter/NumericFormatter";
import { Heading } from "../shared/Heading";
import { Requests } from "./@types/Requests";
import { IoCopyOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import Paragraph from "antd/es/typography/Paragraph";
import { Text } from "../shared/Typography/typography-text";
import { buildDeliveryStatus } from "./functions/buildDeliveryStatus";
import { buildPaymentStatus } from "./functions/buildPaymentStatus";
import { useUserData } from "../../hooks/useUserData/useUserData";
import { useEffect, useState } from "react";
import { useProductsData } from "../Products/hooks/useProductsData";
import { ProductsType } from "../Products/service/getProducts";

export const RequestViewModal = ({ requests }: { requests: Requests }) => {

  const [currentProducts, setCurrentProducts] = useState<ProductsType[]>([])

  const {isLoading,products} = useProductsData();

  useEffect(()=> {

    if(products){
      const currents = products.filter(p => requests.produtos_ids.includes(p.id));
      setCurrentProducts(currents)
    }

  },[products]);

    const productCounts = currentProducts?.reduce((acc, product) => {
      if (product) {
          acc[product.id] = (acc[product.id] || 0) + 1;
      }
      return acc;
  }, {} as { [key: number]: number }) || 0

  const { getUserNameById } = useUserData();

  const data = [
    {
      title: "Data de pagamento",
      label: requests.datapedido,
    },
    {
      title: "Nome comprador:",
      label: getUserNameById(requests.cliente_id),
    },
    {
      title: "Status do pagamento:",
      label: buildPaymentStatus(requests.statuspag),
    },
    {
      title: "Status de entrega",
      label: (
        <Flex gap={10} justify="flex-start">
          <div>{buildDeliveryStatus({
            status: requests.statusentrega,
            request: requests
          })}</div>

          <div className="flex text-start w-full justfy-start items-center gap-2">
            <Paragraph
              className="flex text-[12px] items-center text-brand-purple"
              copyable={{
                icon: [
                  <IoCopyOutline
                    className="text-brand-purple"
                    key={"copy-icon"}
                  />,

                  <FaCheck key="copied-icon" />,
                ],
                tooltips: ["Copiar", "Código copiada"],
                text: requests.codigorastreio || "sem código no momento",
              }}
            >
              Copiar Código de rastreio
            </Paragraph>
          </div>
        </Flex>
      ),
    },
    {
      title: "",
      label: (
        <Flex style={{ maxWidth: "300px" }} gap={5} wrap>
          <Text strong>Endereço de entrega: </Text>
          <Text>{requests.estado}</Text>
          <Text>{requests.cidade}</Text>
          <Text>{requests.rua}</Text>
          <Text>{requests.bairro}</Text>
          <Text>{requests.complemento}</Text>
          <Text>{requests.numero}</Text>
        </Flex>
      ),
    },
    {
      title: "compras/venda: ",
      label: requests.modelo,
    },
    {
      title: "Valor do frete: ",
      label: requests.valorfrete || 'Valor do frete não disponível no momento',
    },
    {
      title: "Preço total do pedido:",
      label: requests.valor,
    },
    {
      title: "Forma de pagamento:",
      label: requests.formapag_id,
    },
    {
      title: "Forma de envio: ",
      label: requests.formaenvio || "Forma de envio indisponível no momento",
    },
  ];

  return (

    isLoading ? <>
      <Skeleton />
    <Empty />
    </> : (
    <Flex align="center" justify="center" vertical>
      <Flex justify="flex-start" className="my-5 w-full" gap={15} align="center">
   
        <Typography.Title className="m-0" level={4}>
        {capitalizeFirstLetter(requests.modelo)}
        </Typography.Title>

        <Text strong>{requests.id} Pedido</Text>
      </Flex>

      {currentProducts && currentProducts.length > 0 ? (
        currentProducts.map((p) => (
          <div key={p.id} className="my-2">
            <Flex className="flex justify-between gap-2">
              <div className="flex gap-2">
                <Image
                  width={185}
                  src={p.imagePath}
                  alt={p.nome}
                  style={{
                    borderRadius: "4px",
                    objectFit: "cover",
                  }}
                />

                <div className="flex flex-col text-start gap-3">
                  <Heading.Root className="text-[16px] font-semibold">
                    <Heading.Content
                      content={`#${p.id < 10 ? "0" + p.id : p.id}Pedido`}
                    />
                  </Heading.Root>
                  <Text className="mt-1">{p.nome}</Text>
                  <Text>Quant: {productCounts[p.id]}</Text>
                </div>
              </div>

              <div>
                <Text className="mt-1 font-medium text-purple-solid-500">
                  <NumericFormatter value={parseFloat(p.valorvenda)} />
                </Text>
              </div>
            </Flex>
          </div>
        ))
      ) : (
        <Flex gap={10}>
          <Empty description="Ops, parece que as imagens dos produtos foram deletadas ):" />
        </Flex>
      )}

      <Flex className="my-5" gap={15} vertical>
        {data.map((item) => {
          return (
            <Flex vertical key={item.title} gap={50}>
              <Flex gap={5}>
                <Text strong>{item.title}</Text>

                <Text className="text-black font-[400]">
                  {Number(item.label) ? (
                    //@ts-ignore
                    <NumericFormatter value={parseFloat(item.label)} />
                  ) : (
                    <>{item.label}</>
                  )}
                </Text>
              </Flex>

              <hr  />
            </Flex>
          );
        })}

      </Flex>


    </Flex>



    )

  );
};

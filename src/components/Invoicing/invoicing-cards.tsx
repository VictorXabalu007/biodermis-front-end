import { useRangeDate } from "../../context/RangeDate/RangeDateContext";
import { useInvoicingCardItem } from "../../hooks/invoicing/useInvoicingCardItem";
import { StatsCard } from "../shared/Card/StatsCard";
import { InputRangePicker } from "../shared/Input/range-picker";
import { Flex, Skeleton, Typography } from "antd";


const {Text} = Typography;

const InvoicingCardContainer = () => {
  
  const { state, getDates } = useRangeDate();
  const { items,isLoading } = useInvoicingCardItem();

  if(isLoading) {
    return <Skeleton />
  }

  return (
    <div className="flex gap-6 flex-col">

      <Flex wrap >
        <Flex gap={10}>
        
        <Text strong>
          {state.rangeDate[0].length > 0 ? 'Dados dos dias: ' : 'Dados do dia: '}
        </Text>

        <Text>
        {state.rangeDate[0].length > 0
            ? `${getDates(state).startDate} 
             até ${getDates(state).endDate}`
            : new Date().toLocaleDateString()}

        </Text>

        </Flex>

        <div className="lg:ms-auto">
          <InputRangePicker />
        </div>
      </Flex>

      <article className="flex gap-3 items-center flex-wrap">
        {items.map((item, index) => {
          return (
            <StatsCard.Root key={index}>
              <StatsCard.Header icon={item.icon} title={item.title} />
              <StatsCard.Footer>
                <StatsCard.FooterContent
                  headingContent={item.footerHeding}
                  textContent={item.footerText}
                />

              </StatsCard.Footer>
            </StatsCard.Root>
          );
        })}
      </article>
    </div>
  );
};

export default InvoicingCardContainer

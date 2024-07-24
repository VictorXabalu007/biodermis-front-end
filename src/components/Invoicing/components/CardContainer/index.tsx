import { useRangeDate } from "../../../../context/RangeDate/RangeDateContext";
import { useInvoicingCardItem } from "../../hooks/useInvoicingCardItem";
import { StatsCard } from "../../../shared/Card/StatsCard";
import { InputRangePicker } from "../../../shared/Input/RangePicker";
import { Flex, Typography } from "antd";
import { RequestStatusChange } from "../../../Requests/hooks/useRequestsData";


const {Text} = Typography;

export const CardContainer = () => {
  const { state, getDates } = useRangeDate();
  const { items } = useInvoicingCardItem();

  

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

                <StatsCard.Percentual status={item.status as RequestStatusChange}  percentual={item.percentual} />
              </StatsCard.Footer>
            </StatsCard.Root>
          );
        })}
      </article>
    </div>
  );
};

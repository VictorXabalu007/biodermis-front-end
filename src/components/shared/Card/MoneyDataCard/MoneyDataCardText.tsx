

import Title from "../../Typography/typography-title"

type MoneyCardTextProps = {

    title: string,
    subtitle: string,
}

export const MoneyDataCardText = ({title, subtitle}:MoneyCardTextProps) => {

    return (


        <div>

        <Title level={5}>

          {title}

        </Title>

            <p className="font-medium text-gray-neutral-600">
                
              {subtitle}

            </p>


        </div>

    )

}
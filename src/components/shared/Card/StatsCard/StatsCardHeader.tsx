import { ElementType } from "react"
import { Heading } from "../../Heading"


type HeaderProps = {
    icon:ElementType,
    title: string
}

export const StatsCardHeader = ({icon:Icon, title}:HeaderProps) => {
    return (

                <div className="flex items-start">

                <div className="flex items-center gap-2">    
                    
                    <div className="rounded-md p-3 bg-brand-purple/25">
                        <Icon className="text-brand-purple text-2xl fw-bold" />
                    </div>
                    
                    <Heading.Root>
                        <Heading.Content content={title} />
                    </Heading.Root>

                </div>

            </div>
    )
}
import { Heading } from "../../Heading"
import { Text } from "../../Text"

type FooterContentProps = {
    headingContent: string;
    textContent: string;
}


export const StatsCardFooterContent = ({headingContent,textContent}:FooterContentProps) => {
    return (
        <div className="flex items-center gap-2">
            <Heading.Root className="text-black text-[32px] fw-bold">
                <Heading.Content content={headingContent} />
            </Heading.Root>
            <Text.Root>
                <Text.Content content={textContent}/>
            </Text.Root>
        </div>
    )
}
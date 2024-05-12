import { Heading } from "../Heading"
import { Text } from "../Text"



type FormSubHeaderProps = {
  heading:string,
  subtext:string,
}

export const FormSubHeader = ({heading,subtext}:FormSubHeaderProps) => {

    return (


      <div>
        <Heading.Root className="text-purple-solid-500 text-[18px]">
          <Heading.Content content={heading} />
        </Heading.Root>

        <Text.Root className="font-[300] text-[14px]">
          <Text.Content content={subtext} />
        </Text.Root>
      </div>

    )
}

import Title from "../Typography/typography-title"



type FormSubHeaderProps = {
  heading:string,
  subtext:string,
}

export const FormSubHeader = ({heading,subtext}:FormSubHeaderProps) => {

    return (


      <div>
        <Title className="text-purple-solid-500 text-[18px]">
          {heading} 
        </Title>

        <p className="font-[300] text-[14px]">
          {subtext}
        </p>
      </div>

    )
}
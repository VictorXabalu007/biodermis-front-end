import { IoIosArrowUp } from "react-icons/io";
import { colors } from "../../../../theme/colors";
import { Text } from "../../Typography/typography-text";


export const buildPodium = (rank: string) => {
    console.log({ rank })
    switch (rank) {
        case '1':
            return (
                <div className='flex justify-center me-6 items-center'>
                    <div className='bg-gradient-to-b from-gold-light to-gold-dark px-5 py-3 rounded-[100%]'>
                        <Text strong style={{ color: colors.white }}>
                            {rank}
                        </Text>
                    </div>
                </div>
            )
        case '2':
            return (
                <div className='flex justify-center me-6 items-center'>
                    <div className='bg-gradient-to-b from-silver-light to-silver-dark px-5 py-3 rounded-[100%]'>
                        <Text strong style={{ color: colors.white }}>
                            {rank}
                        </Text>
                    </div>
                </div>
            );
        case '3':

            return (
                <div className='flex me-6 justify-center items-center'>
                    <div className='bg-gradient-to-b from-bronze-light to-bronze-dark px-5 py-3 rounded-[100%]'>
                        <Text strong style={{ color: colors.white }}>
                            {rank}
                        </Text>
                    </div>
                </div>
            );
        default:
            return (
                <div className="flex px-2 gap-2 items-center">

                    <Text strong>{rank}</Text>

                    <IoIosArrowUp className="text-lg text-green-flat" />

                </div>
            )

    }


}
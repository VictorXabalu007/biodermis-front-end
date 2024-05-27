import { Text } from "../../Text";

export const buildPodium = (rank:string) => {

    switch(rank) {
        case '1':
            return (
                <div className='flex justify-center me-6 items-center'>
                    <div className='bg-gradient-to-b from-gold-light to-gold-dark px-5 py-3 rounded-[100%]'>
                        <Text.Root className='text-white font-bold'>
                            <Text.Content content={rank} />
                        </Text.Root>
                    </div>
                </div>
            )
        case '2':
            return (
                <div className='flex justify-center me-6 items-center'>
                    <div className='bg-gradient-to-b from-silver-light to-silver-dark px-5 py-3 rounded-[100%]'>
                        <Text.Root className='text-white font-bold'>
                            <Text.Content content={rank} />
                        </Text.Root>
                    </div>
                </div>
            );
        case '3':

            return (
                <div className='flex me-6 justify-center items-center'>
                    <div className='bg-gradient-to-b from-bronze-light to-bronze-dark px-5 py-3 rounded-[100%]'>
                        <Text.Root className='text-white font-bold'>
                            <Text.Content content={rank} />
                        </Text.Root>
                    </div>
                </div>
            );
            
    }

}
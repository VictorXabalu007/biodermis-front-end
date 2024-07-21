import { Banners } from "../../components/Banners"

export const BannersTemplate = () => {

    return (
        <Banners.Layout>


        <Banners.Header
            heading="Banners"
        />


        <Banners.Content>

                <Banners.Container />

        </Banners.Content>


    </Banners.Layout>
    )
}
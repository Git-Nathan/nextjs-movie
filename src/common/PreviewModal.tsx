import { Api } from "@/api"
import { useQuery } from "@tanstack/react-query"

interface IBtnWatch {
    id: number
    media_type: string
}

export default function PreviewModal(props: IBtnWatch) {
    const { data } = useQuery({
        queryKey: ['trailer', props.id, props.media_type],
        queryFn: () => Api.trailer.getTrailer(props.id, props.media_type),
    })

    return <iframe
        src={`https://www.youtube.com/embed/${data?.key}`}
        allow="autoplay; encrypted-media"
        allowFullScreen
    ></iframe>
}

import { appRouter } from '@/configs'
import { IMovieBox } from '@/interface'
import { getImageUrl } from '@/utils/functions'
import { Skeleton } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

export interface IMovieBoxs {
  loading: boolean
  data: IMovieBox[]
}

export function MovieBoxs({ loading, data }: IMovieBoxs) {
  if (loading)
    return (
      <>
        {Array(20)
          .fill(0)
          .map((result) => (
            <Skeleton.Button
              key={result.id}
              className="aspect-[240/136] !h-auto !w-full"
              block
              active
            />
          ))}
      </>
    )

  return (
    <>
      {data.map((result) => (
        <Link
          href={appRouter.detailInfo.index(result.id)}
          key={result.id}
          className="relative aspect-[240/136] w-full"
        >
          <Image
            src={getImageUrl(result.backdrop_path)}
            alt={result.title || 'Untitled'}
            width={240}
            height={136}
            priority
            className="left-0 top-0 h-full w-full rounded-lg object-cover"
          />
        </Link>
      ))}
    </>
  )
}

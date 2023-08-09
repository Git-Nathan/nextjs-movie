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
    return <>{data.map((result) => (
      <Skeleton.Button
        key={result.id}
        className="!w-full !h-auto aspect-[240/136]"
        block
        active
      />
    ))}
    </>

  return<>{data.map((result) => (
    <Link
      href={appRouter.detailInfo.index(result.id)}
      key={result.id}
      className="relative w-full aspect-[240/136]"
    >
      <Image
        src={getImageUrl(result.backdrop_path)}
        alt={result.title || 'Untitled'}
        width={240}
        height={136}
        priority
        className="w-full h-full top-0 left-0 object-cover rounded-lg"
      />
    </Link>
  ))}
  </> 
}

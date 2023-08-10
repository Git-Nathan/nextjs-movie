'use client'

import { HomeIcon, MovieIcon, TvIcon } from '@/assets/icons'
import { NavLink } from '@/common/NavLink'
import { appRouter } from '@/configs'
import { useTranslations } from 'next-intl'

export function HeaderMenu() {
  const t = useTranslations('Menu')

  return (
    <div className="hidden items-center md:flex">
      <NavLink
        className="flex items-center px-4 py-2 text-base text-white hover:!text-text_link"
        href={appRouter.home}
        exact
      >
        <HomeIcon />
        <p className="ml-2">{t('home')}</p>
      </NavLink>
      <NavLink
        className="flex items-center px-4 py-2 text-base text-white hover:!text-text_link"
        href={appRouter.series.index}
        exact
      >
        <TvIcon />
        <p className="ml-2">{t('series')}</p>
      </NavLink>
      <NavLink
        className="flex items-center px-4 py-2 text-base text-white hover:!text-text_link"
        href={appRouter.films.index}
        exact
      >
        <MovieIcon />
        <p className="ml-2">{t('films')}</p>
      </NavLink>
    </div>
  )
}

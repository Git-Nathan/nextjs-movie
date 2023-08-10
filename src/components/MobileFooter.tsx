'use client'

import { HomeIcon, MovieIcon, TvIcon } from '@/assets/icons'
import { NavLink } from '@/common/NavLink'
import { appRouter } from '@/configs'
import { workSans } from '@/fonts'
import { Footer } from 'antd/es/layout/layout'
import { useTranslations } from 'next-intl'

export function MobileFooter() {
  const t = useTranslations('Menu')

  return (
    <Footer
      className={
        'mobile-footer fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 items-center p-0 lg:hidden ' +
        workSans.className
      }
    >
      <NavLink
        className="flex flex-col items-center px-4 text-base text-white hover:!text-text_link"
        href={appRouter.home}
        exact
      >
        <HomeIcon />
        <p className="w-full truncate text-center">{t('home')}</p>
      </NavLink>
      <NavLink
        className="flex flex-col items-center px-4 text-base text-white hover:!text-text_link"
        href={appRouter.series.index}
      >
        <TvIcon />
        <p className="w-full truncate text-center">{t('series')}</p>
      </NavLink>
      <NavLink
        className="flex flex-col items-center px-4 text-base text-white hover:!text-text_link"
        href={appRouter.films.index}
      >
        <MovieIcon />
        <p className="w-full truncate text-center">{t('films')}</p>
      </NavLink>
    </Footer>
  )
}

'use client'

import { Menu, MenuProps } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import { useTranslations } from 'next-intl'
import * as React from 'react'

export function MobileFooter() {
  const t = useTranslations('Menu')

  // Menu
  const [current, setCurrent] = React.useState('home')

  const items: MenuProps['items'] = [
    {
      label: t('home'),
      key: 'home',
      icon: (
        <>
          <div
            className="icon h-6 w-6 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/icons/home.svg')` }}
          ></div>
          <div
            className="active-icon h-6 w-6 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/icons/home-active.svg')` }}
          ></div>
        </>
      ),
    },
    {
      label: t('series'),
      key: 'series',
      icon: (
        <>
          <div
            className="icon h-6 w-6 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/icons/tv.svg')` }}
          ></div>
          <div
            className="active-icon h-6 w-6 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/icons/tv-active.svg')` }}
          ></div>
        </>
      ),
    },
    {
      label: t('films'),
      key: 'films',
      icon: (
        <>
          <div
            className="icon h-6 w-6 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/icons/movie.svg')` }}
          ></div>
          <div
            className="active-icon h-6 w-6 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/icons/movie-active.svg')` }}
          ></div>
        </>
      ),
    },
  ]

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  return (
    <Footer className="mobile-footer fixed inset-x-0 bottom-0 z-50 p-0 md:hidden">
      <Menu
        className="mobile__nav-menu"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        disabledOverflow
      />
    </Footer>
  )
}

'use client'

import { HeaderMenu } from '@/components/HeaderMenu'
import { SearchButton } from '@/components/SearchButton'
import { appRouter } from '@/configs'
import { Header } from 'antd/es/layout/layout'
import Image from 'next/image'
import Link from 'next/link'
import { HeaderAccount } from './HeaderAccount'
import { LanguageButton } from './LanguageButton'

export interface IHeaderProps {}

export function AppHeader(props: IHeaderProps) {
  return (
    <Header className="header fixed inset-x-0 top-0 z-50 h-14 w-full bg-[linear-gradient(180deg,#0E1012_0%,rgba(14,16,18,0.00)_100%)] font-medium text-white md:h-20">
      <div className="mx-auto flex h-full w-[89%] justify-between">
        <div className="header__left flex items-center">
          <Link href={appRouter.home}>
            <Image
              className="header__logo mr-6 h-[40px] w-[73px]"
              width={73}
              height={40}
              src="/icons/logo.svg"
              alt="footer-logo"
            />
          </Link>
          <HeaderMenu />
        </div>
        <div className="header__right flex items-center">
          <LanguageButton />
          <SearchButton />
          <HeaderAccount />
        </div>
      </div>
    </Header>
  )
}

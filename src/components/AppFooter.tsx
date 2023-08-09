'use client'

import { lato } from '@/fonts'
import { Footer } from 'antd/es/layout/layout'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export interface IFooterProps {}

export function AppFooter(props: IFooterProps) {
  const t = useTranslations('Footer')

  return (
    <Footer
      className={
        'app-footer z-30 flex justify-center px-0 py-2 text-white ' +
        lato.className
      }
    >
      <div className="flex w-11/12 flex-col items-center pb-7 pt-7 md:pt-12">
        <Image
          className="h-[56px] w-[92px]"
          width={92}
          height={56}
          src="/icons/logo.svg"
          alt="footer-logo"
        />
        <div className="mt-8 flex flex-wrap justify-center">
          <div className="mx-2 text-xs leading-[18px]">{t('policy')}</div>
          <div className="mx-2 text-xs leading-[18px]">{t('agreement')}</div>
          <div className="mx-2 text-xs leading-[18px]">{t('guide')}</div>
          <div className="mx-2 text-xs leading-[18px]">
            {t('supported-devices')}
          </div>
          <div className="mx-2 text-xs leading-[18px]">{t('about')}</div>
          <div className="mx-2 text-xs leading-[18px]">
            {t('publicidad-personalizada')}
          </div>
        </div>
        <div className="mt-9 max-w-[456px] text-center text-xs">
          {t('page-info')}
        </div>
        <div className="mt-10 max-w-[456px] text-center text-xs">
          {t('reserved')}
        </div>
      </div>
    </Footer>
  )
}

export interface IHeaderAccount {}
import { workSans } from '@/fonts'
import { Button, Popover, Skeleton } from 'antd'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export function HeaderAccount(props: IHeaderAccount) {
  const { data: session, status } = useSession()
  const t = useTranslations('Popover')

  const [openPopover, setOpenPopover] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpenPopover(newOpen)
  }

  if (status === 'loading')
    return (
      <div className="flex h-12 w-12 items-center justify-center">
        <Skeleton.Avatar size={'large'} active />
      </div>
    )

  if (session)
    return (
      <Popover
        content={
          <div
            className={
              'flex w-[248px] flex-col rounded-lg bg-neutral700 px-5 py-2 text-base text-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.40)] ' +
              workSans.className
            }
          >
            <div className="py-3">{t('edit-profile')}</div>
            <div className="py-3">{t('favorite')}</div>
            <div className="py-3">{t('my-subscription')}</div>
            <div className="py-3">{t('My account')}</div>
            <div className="py-3">{t('Help')}</div>
            <Button
              className="mx-0 h-auto border-none p-0 py-3 text-left text-base text-white"
              onClick={() => signOut()}
            >
              {t('Sign off')}
            </Button>
          </div>
        }
        trigger="click"
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
        open={openPopover}
        onOpenChange={handleOpenChange}
      >
        <Button
          className="h-12 w-12 rounded-full border-[2px] border-solid border-secondary bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${session?.user.image}')` }}
        ></Button>
      </Popover>
    )

  return (
    <Button
      className="header__user flex h-12 w-12 items-center justify-center rounded-full border-[2px] border-secondary bg-cover bg-center bg-no-repeat p-0 hover:!border-text_link"
      onClick={() => signIn()}
    >
      <div
        className="h-7 w-7 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/icons/user.svg')` }}
      ></div>
    </Button>
  )
}

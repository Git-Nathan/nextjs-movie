import { Button, Popover } from 'antd'
import Link from 'next-intl/link'
import Image from 'next/image'
import { useState } from 'react'

export interface ILanguageButton {}

export function LanguageButton(props: ILanguageButton) {
  const [openPopover, setOpenPopover] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpenPopover(newOpen)
  }

  return (
    <Popover
      content={
        <div className="flex flex-col rounded-lg bg-neutral700 px-5 py-2 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.40)]">
          <Link href="/" locale="en">
            <Image
              className="h-6 w-6"
              src={'/icons/english.svg'}
              height={24}
              width={24}
              alt="icon-english"
            ></Image>
          </Link>
          <Link href="/" locale="vi">
            <Image
              className="mt-2 h-6 w-6"
              src={'/icons/vietnamese.svg'}
              height={24}
              width={24}
              alt="icon-vietnamese"
            ></Image>
          </Link>
        </div>
      }
      trigger="click"
      placement="bottom"
      arrow={{ pointAtCenter: true }}
      open={openPopover}
      onOpenChange={handleOpenChange}
    >
      <Button
        className="rounded-full border-none"
        icon={
          <Image
            className="h-6 w-6"
            src={'/icons/language.svg'}
            height={24}
            width={24}
            alt="icon-language"
          />
        }
      />
    </Popover>
  )
}

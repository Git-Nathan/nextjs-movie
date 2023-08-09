'use client'

import { appRouter } from '@/configs'
import { useClickOutside } from '@/hooks/useClickOutside'
import { Button, Input } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export interface ISearchButtonProps {}

export function SearchButton(props: ISearchButtonProps) {
  const t = useTranslations('Index')

  //Router
  const router = useRouter()

  // Search bar
  const [open, setOpen] = useState<boolean>(false)
  const searchBarRef = useRef<HTMLDivElement>(null)
  const [searchContent, setSearchContent] = useState('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSearch = (value: string) => {
    if (value) {
      router.push(
        `${appRouter.result}?${new URLSearchParams({
          search_query: value,
        }).toString()}`,
      )
      handleClose()
    }
  }

  const handleClear = () => {
    setSearchContent('')
  }

  useClickOutside(searchBarRef, handleClose)

  return (
    <div className="relative mr-2 md:mr-4">
      <Button
        className="search-button flex h-12 items-center rounded-full border-none px-2 text-white hover:text-white md:px-4"
        onClick={handleOpen}
      >
        <div
          className="h-8 w-8 bg-cover bg-center bg-no-repeat md:h-6 md:w-6"
          style={{ backgroundImage: `url('/icons/search.svg')` }}
        ></div>
        <div className="ml-2 hidden text-base font-medium md:block">
          {t('search')}
        </div>
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 bg-[#0000002c] md:hidden"></div>
          <div
            className="fixed inset-x-0 top-0 z-50 flex h-12 items-center bg-neutral700 md:absolute md:left-auto md:right-0 md:block md:w-[329px] md:rounded md:border md:border-solid md:border-[rgba(255,255,255,0.12)]"
            ref={searchBarRef}
          >
            <div className="flex h-full w-full items-center">
              <Input.Search
                className="relative w-full pl-12 pr-[90px]"
                placeholder="Search"
                value={searchContent}
                onChange={(e) => setSearchContent(e.target.value)}
                onSearch={handleSearch}
                autoFocus
              />
              <div
                className="absolute left-4 h-6 w-6"
                style={{ backgroundImage: `url('/icons/search.svg')` }}
              ></div>
              <Button
                className="absolute right-12 flex h-8 items-center justify-center rounded-full border-none px-2 py-0 text-white hover:bg-slate-700"
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                className="absolute right-4 flex h-8 w-8 items-center justify-center rounded-full border-none p-0 hover:bg-slate-700"
                icon={
                  <div
                    className="h-6 w-6 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('/icons/close.svg')` }}
                  ></div>
                }
                onClick={handleClose}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

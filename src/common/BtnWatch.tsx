import { Button, Modal } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import * as React from 'react'
import PreviewModal from './PreviewModal'

interface IBtnWatch {
  id: number
  media_type: string
}

export function BtnWatchTrailer(props: IBtnWatch) {
  const t = useTranslations('HomePage')

  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <Button
        className="home__btn-watch flex h-12 flex-1 items-center justify-center bg-white px-6 text-base  font-bold hover:bg-neutral-300"
        icon={
          <Image alt="" width={24} height={24} src="/icons/icon-play.svg" />
        }
        onClick={() => setIsModalOpen(true)}
      >
        {t('watch')}
      </Button>

      <Modal
        destroyOnClose
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(true)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <PreviewModal {...props} />
      </Modal>
    </>
  )
}

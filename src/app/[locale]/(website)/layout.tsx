import { AppFooter } from '@/components/AppFooter'
import { AppHeader } from '@/components/AppHeader'
import { MobileFooter } from '@/components/MobileFooter'
import { workSans } from '@/fonts'
import { Layout } from 'antd'

interface IMainLayout {
  children: React.ReactNode
}

export default function MainLayout({ children }: IMainLayout) {
  return (
    <>
      <Layout className={workSans.className}>
        <AppHeader />
        <main className="z-0">{children}</main>
        <AppFooter />
        <MobileFooter />
      </Layout>
    </>
  )
}

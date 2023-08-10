import { useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface INavLink {
  href: string
  exact?: boolean
  children: React.ReactNode
  className?: string
}

export function NavLink({
  href,
  exact = false,
  children,
  className,
  ...props
}: INavLink) {
  const pathname = usePathname()
  const locale = useLocale()

  if (locale !== 'en') {
    href = `/` + locale + href
  }

  let isActive = false

  isActive = exact ? pathname === href : pathname.startsWith(href)

  let classes = `nav-link ${className}`

  if (isActive) {
    classes += ' active'
  }

  return (
    <Link className={classes} href={href} {...props}>
      {children}
    </Link>
  )
}

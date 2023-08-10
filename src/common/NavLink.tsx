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
  let linkPath = href
  let classes = `nav-link ${className}`

  // Check locale
  if (locale !== 'en') {
    if (linkPath === '/') linkPath = ''
    linkPath = `/` + locale + linkPath
  }

  //Check active
  let isActive = false
  isActive = exact ? pathname === linkPath : pathname.startsWith(linkPath)
  if (isActive) {
    classes += ' active'
  }

  return (
    <Link className={classes} href={href} {...props}>
      {children}
    </Link>
  )
}

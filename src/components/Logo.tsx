import Link from 'next/link'

interface LogoProps {
  className?: string
  href?: string
}

export function Logo({ className = '', href = '/' }: LogoProps) {
  const logoContent = (
    <span className={`text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent ${className}`}>
      Emergyn
    </span>
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}

import Link from "next/link"

import { Button } from "../ui/button"
import { LucideIcon } from "lucide-react"

type Props = React.ComponentProps<"button"> & {
  href: string
  children?: React.ReactNode
  linkClassName?: string
  variant?: any
  icon?: LucideIcon
  size?: any
}

export const LinkBtn = ({ linkClassName, icon: Icon, variant, href, children, size = "default", ...props }: Props) => {
  return (
    <Link href={href}>
      <Button {...props} icon={Icon} size={size} variant={variant}>
        {children}
      </Button>
    </Link>
  )
}

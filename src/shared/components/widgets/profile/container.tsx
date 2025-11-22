import { ProfileTabs } from "./tabs"

type Props = {
  children: React.ReactNode
  showDefault?: boolean
  tabs?: {
    label: string
    icon: React.ComponentType<any>
    href: string
  }[]
}

export const ProfileContainer = ({ tabs, children }: Props) => {
  return (
    <div className='flex flex-wrap gap-8'>
      <ProfileTabs />
      <div className='flex-1'>{children}</div>
    </div>
  )
}

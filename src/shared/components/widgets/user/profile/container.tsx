import { ProfileTabs } from "./tabs"

type Props = {
  children: React.ReactNode
}

export const ProfileContainer = ({ children }: Props) => {
  return (
    <div className='flex flex-wrap gap-8'>
      <ProfileTabs />
      <div className='flex-1'>{children}</div>
    </div>
  )
}

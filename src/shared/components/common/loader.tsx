import { Loader } from "lucide-react"

type Props = {
  size?: number
  text?: string
}

export const Loading = ({ size = 40, text }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 p-4'>
      <Loader size={size} className='animate-spin text-gray-600' />
      {text && <span className='text-gray-600'>{text}</span>}
    </div>
  )
}

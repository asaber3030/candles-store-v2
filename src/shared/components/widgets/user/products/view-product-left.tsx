import { useState } from "react"
import { ProductPicture } from "@prisma/client"

type Props = {
  pictures: ProductPicture[]
  mainPicture: string
}

export const ViewProductLeftSide = ({ mainPicture, pictures }: Props) => {
  const [selectedImage, setSelectedImage] = useState(mainPicture)

  return (
    <div className='flex flex-col gap-4'>
      {/* Main Picture */}
      <section className='w-full'>
        <div className='w-full h-[450px] bg-gray-100 rounded-xl overflow-hidden'>
          <img src={selectedImage} alt='Main Product Picture' className='w-full h-full object-cover' />
        </div>
      </section>

      {/* Thumbnails */}
      <div className='flex gap-3 overflow-x-auto justify-center py-2'>
        {pictures.map((pic) => {
          const isActive = selectedImage === pic.picture

          return (
            <button
              key={`product-thumbnail-${pic.id}`}
              onClick={() => setSelectedImage(pic.picture)}
              className={`w-20 h-20 rounded-lg overflow-hidden border transition 
                ${isActive ? "border-black shadow-md" : "border-gray-300"}
              `}
            >
              <img src={pic.picture} alt='Thumbnail' className='w-full h-full object-cover' />
            </button>
          )
        })}
      </div>
    </div>
  )
}

import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react"
import { Settings } from "@prisma/client"

type Props = { settings: Settings }

export const ViewSettingsCard = ({ settings: data }: Props) => {
  return (
    <div className='w-full max-w-md'>
      {!!data.defaultBanner && <img src={data.defaultBanner} alt='Banner' className='w-full object-cover rounded-2xl mb-4' />}

      {/* Main Card */}
      <div className='bg-card rounded-2xl shadow-2xl overflow-hidden border border-border'>
        {/* Logo Section */}
        <div className='relative flex justify-center mt-4 mb-4'>
          <img src={data.logo} alt='Logo' className='w-24 h-24 rounded-full object-cover' />
        </div>

        {/* Content Section */}
        <div className='px-6 pb-6 text-center'>
          {/* Business Name */}
          <h1 className='text-2xl font-bold text-foreground mb-2'>{data.siteName}</h1>

          {/* Description */}
          <p className='text-sm text-muted-foreground mb-6 leading-relaxed'>{data.description}</p>
          <p className='text-sm text-muted-foreground mb-6 leading-relaxed'>{data.arDescription}</p>

          {/* Divider */}
          <div className='h-1 w-12 from-primary to-accent mx-auto mb-6 rounded-full' />

          {/* Contact Information */}
          <div className='space-y-3 mb-6'>
            {/* Phone */}
            <div className='flex items-center justify-center gap-3 text-sm'>
              <Phone className='w-4 h-4 text-primary' />
              <a href={`tel:${data.phoneNumber}`} className='text-foreground hover:text-primary transition-colors'>
                {data.phoneNumber}
              </a>
            </div>

            {/* Email */}
            <div className='flex items-center justify-center gap-3 text-sm'>
              <Mail className='w-4 h-4 text-primary' />
              <a href={`mailto:${data.email}`} className='text-foreground hover:text-primary transition-colors'>
                {data.email}
              </a>
            </div>

            {/* Address */}
            <div className='flex items-center justify-center gap-3 text-sm'>
              <MapPin className='w-4 h-4 text-primary' />
              <span className='text-foreground'>{data.address}</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className='flex items-center justify-center gap-4'>
            <a href={`https://facebook.com/${data.facebook}`} target='_blank' rel='noopener noreferrer' className='w-10 h-10 rounded-full bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center' aria-label='Facebook'>
              <Facebook className='w-5 h-5' />
            </a>
            <a
              href={`https://instagram.com/${data.instagram}`}
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 rounded-full bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center'
              aria-label='Instagram'
            >
              <Instagram className='w-5 h-5' />
            </a>
          </div>
        </div>

        {/* Footer Accent */}
        <div className='h-1 from-accent via-primary to-accent' />
      </div>
    </div>
  )
}

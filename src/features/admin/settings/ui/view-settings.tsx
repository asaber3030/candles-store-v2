import { Mail, Phone, MapPin, Instagram, Facebook, TwitterIcon } from "lucide-react";
import { Settings } from "@prisma/client";
import { isVideoExtension } from "@/shared/lib/functions";

type Props = { settings: Settings };

export const ViewSettingsCard = ({ settings: data }: Props) => {
  return (
    <div className="w-full">
      {/* Banner Image */}
      {!!data.defaultBanner && <>{isVideoExtension(data.bannerExtension) ? <video src={data.defaultBanner} controls className="w-full h-auto object-cover rounded-xl mb-2 bg-black" title="banner-video" /> : <img src={data.defaultBanner} alt="Banner" className="w-full h-auto object-cover rounded-xl mb-2" />}</>}

      {/* Main Card */}
      <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
        {/* Logo Section */}

        <div className="relative flex justify-center mt-4 mb-4">
          <img src={data.logo} alt="Logo" className="w-24 h-24 rounded-full object-cover" />
        </div>

        {/* Content Section */}
        <div className="px-6 pb-6 text-center">
          {/* Business Name */}
          <h1 className="text-2xl font-bold text-foreground mb-2">{data.siteName}</h1>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{data.description}</p>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{data.arDescription}</p>

          {/* Divider */}
          <div className="h-1 w-12 from-primary to-accent mx-auto mb-6 rounded-full" />

          {/* Contact Information */}
          <div className="space-y-3 mb-6">
            {/* Phone */}
            <div className="flex items-center justify-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-primary" />
              <a href={`tel:${data.phoneNumber}`} className="text-foreground hover:text-primary transition-colors">
                {data.phoneNumber}
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center justify-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <a href={`mailto:${data.email}`} className="text-foreground hover:text-primary transition-colors">
                {data.email}
              </a>
            </div>

            {/* Address */}
            <div className="flex items-center justify-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-foreground">{data.address}</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-4">
            {data.facebook && (
              <a href={data.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            )}
            {data.instagram && (
              <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {data.twitter && (
              <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center" aria-label="Twitter">
                <TwitterIcon className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Footer Accent */}
        <div className="h-1 from-accent via-primary to-accent" />
      </div>
    </div>
  );
};

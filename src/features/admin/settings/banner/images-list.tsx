import { deleteBannerImageAction } from "@/entities/banner/api/banner.api";
import { DeleteModal } from "@/shared/components/common/delete-modal";
import { BannerImage } from "@prisma/client";

type Props = {
  images: BannerImage[];
};

export const AdminBannerImagesList = ({ images }: Props) => {
  return (
    <div className="flex gap-3 flex-wrap">
      {images.map((img) => (
        <div key={`banner-image-${img.id}`} className="w-96 rounded overflow-hidden border space-y-2 h-fit p-2">
          <img src={img.image} alt={`banner-img-${img.id}`} className="object-cover w-full rounded-md" />
          <DeleteModal id={img.id} action={deleteBannerImageAction} />
        </div>
      ))}
    </div>
  );
};

import { FullPopup } from "@/entities/popup/model/popup"
import { DeleteImagePopupButton } from "./delete-popup-image-button"

const isVideoExtension = (extension: string | null | undefined): boolean => {
  if (!extension) return false
  const lowerCaseExt = extension.toLowerCase()
  return ["mp4", "mov", "webm", "ogg", "avi"].includes(lowerCaseExt)
}

export const AdminPopupViewer = ({ popup }: { popup: FullPopup }) => {
  const isVideo = isVideoExtension(popup.extension)

  return (
    <div className="w-full border rounded-md p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Popup Preview</h2>

      <div className="w-full h-96 flex-shrink-0 rounded-md overflow-hidden border">
        {popup.image ? (
          isVideo ? (
            <video src={popup.image} controls className="w-full h-full object-cover bg-black" title={popup.title ?? "popup-video"} />
          ) : (
            <img src={popup.image} alt={popup.title ?? "popup-image"} className="w-full h-full object-cover" />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">No media</div>
        )}
      </div>
      <div className="flex gap-6 my-4">
        <div className="flex-1">
          <div className="mb-3">
            <strong className="block">Title (EN):</strong>
            <div className="text-sm text-gray-800">{popup.title}</div>
          </div>

          <div className="mb-3">
            <strong className="block">Title (AR):</strong>
            <div className="text-sm text-gray-800">{popup.titleAr}</div>
          </div>

          <div className="mb-3">
            <strong className="block">Active:</strong>
            <div className="text-sm">{popup.isActive ? "Yes" : "No"}</div>
          </div>

          {popup.link && (
            <div className="mb-3">
              <strong className="block">Link:</strong>
              <a href={popup.link} className="text-sm text-blue-600 break-words" target="_blank" rel="noreferrer">
                {popup.link}
              </a>
            </div>
          )}

          <div className="mb-3">
            <strong className="block">Extension:</strong>
            <div className="text-sm text-gray-700">{popup.extension}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <strong className="block mb-2">Content (EN):</strong>
          <div className="prose max-w-none text-sm text-gray-800">
            {/* content may contain plain text or HTML; render as HTML to preserve formatting */}
            <div dangerouslySetInnerHTML={{ __html: popup.content ?? "" }} />
          </div>
        </div>

        <div>
          <strong className="block mb-2">Content (AR):</strong>
          <div className="prose max-w-none text-sm text-gray-800">
            <div dangerouslySetInnerHTML={{ __html: popup.contentAr ?? "" }} />
          </div>
        </div>
      </div>

      {/* Note: Additional images are still rendered as <img> as per original logic */}
      {popup.images && popup.images.length > 0 && (
        <div className="mt-6">
          <strong className="block mb-2">Additional Images</strong>
          <div className="flex gap-3 flex-wrap">
            {popup.images.map((img) => (
              <div key={`popup-image-${img.id}`} className="w-96 rounded overflow-hidden border space-y-2 h-fit p-2">
                <img src={img.image} alt={`popup-img-${img.id}`} className="object-cover w-full rounded-md" />
                <DeleteImagePopupButton imageId={img.id} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

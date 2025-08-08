import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import { ImageModal } from "~/_components/image-modal";
import { UploadDialog } from "~/_components/upload-dialog";

export const dynamic = "force-dynamic"; // This page is dynamic and should not be cached

async function Images() {
  const images = await getMyImages();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Upload Button (Centered) */}
      <div className="flex justify-center p-6">
        <UploadDialog />
      </div>

      {/* Empty State */}
      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg text-gray-400">No images uploaded yet.</p>
          <p className="mt-2 text-sm text-gray-500">
            Click the button above to start your gallery.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl bg-zinc-800 shadow-lg ring-1 ring-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:ring-white/20"
            >
              {/* Image */}
              <ImageModal image={image}>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.imageName || `Image ${image.id}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
              </ImageModal>

              {/* Text content */}
              <div className="p-4">
                <h3 className="truncate text-lg font-semibold">
                  {image.imageName || image.fileName}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-400">
                  {image.description || "No description"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <SignedOut>
        <div className="flex h-screen flex-col items-center justify-center text-center text-2xl text-gray-300">
          <p className="mb-4">🚪 Please sign in above to continue</p>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex flex-col items-center">
          <h1 className="mt-8 text-4xl font-bold text-white drop-shadow-lg">
            Welcome to TalkMate+
          </h1>
          <p className="mt-2 text-gray-400">
            Manage and view your personal image gallery
          </p>
          <div className="mt-8 w-full">
            <Images />
          </div>
        </div>
      </SignedIn>
    </main>
  );
}

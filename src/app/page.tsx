import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import { ImageModal } from "~/_components/image-modal";
import { UploadDialog } from "~/_components/upload-dialog";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Upload Button */}
      <div className="sticky top-4 z-10 mx-4 mb-8 flex justify-end md:mx-8">
        <UploadDialog/>
        
      </div>

      {/* Empty State */}
      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 rounded-full bg-gray-800 p-6">
          </div>
          <h3 className="text-xl font-semibold text-gray-200">
            Your visual library is empty
          </h3>
          <p className="mt-2 max-w-md text-gray-400">
            Start building your communication toolkit by uploading your first
            sign or gesture
          </p>
        </div>
      ) : (
        <div className="px-4 pb-16 md:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">My Communication Library</h2>
            <p className="mt-1 text-gray-400">
              {images.length} sign{images.length !== 1 ? "s" : ""} available
            </p>
          </div>

          <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition-all duration-300 hover:border-indigo-500/30 hover:bg-gray-800/50"
              >
                <ImageModal image={image}>
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={image.imageUrl}
                      alt={image.imageName || `Sign ${image.id}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-100 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </ImageModal>

                <div className="p-4">
                  <h3 className="truncate text-lg font-semibold">
                    {image.imageName || image.fileName}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-400">
                    {image.description || "No description provided"}
                  </p>
                </div>

                <div className="absolute right-3 top-3 rounded-full bg-gray-800/80 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                  Sign
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950">
      <SignedOut>
        <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
          <div className="mb-8 animate-float rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 p-6 shadow-xl">
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Welcome to TalkMate+ Pro
          </h1>
          <p className="mt-4 max-w-lg text-lg text-gray-400">
            Your personal library for sign language and non-verbal communication
          </p>
          <div className="mt-8 rounded-lg bg-gray-800/50 px-6 py-4 text-gray-300 backdrop-blur-sm">
            <p className="flex items-center">
              <span className="mr-2 inline-flex h-3 w-3 animate-pulse rounded-full bg-indigo-500"></span>
              Please sign in to access your visual communication library
            </p>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex flex-col">
          <div className="border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-950 px-4 py-12 md:px-8">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Welcome to TalkMate+Pro
            </h1>
            <p className="mt-3 max-w-2xl text-gray-400">
              Manage your personal library of sign language and gesture images
              for enhanced non-verbal communication
            </p>
          </div>

          <div className="mt-8 w-full">
            <Images />
          </div>
        </div>
      </SignedIn>
    </main>
  );
}
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { get } from "http";
import Link from "next/link";
import { UploadDialog } from "~/_components/upload-dialog";
import { getMyImages } from "~/server/queries";
import { UploadButton } from "~/utils/uploadthing";

export const dynamic = "force-dynamic"; 

async function Images() {
  const images = await getMyImages();

return (
  <div>
    <div className="flex justify-end p4">
      <UploadDialog />
    </div>
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {images.map((image) => (
        <div key={image.id} className="flex w-64 flex-col">
          <div className="relative aspect-video bg-zinc-900 overflow-hidden">
            <img
              src={image.imageUrl}
              alt={`Image ${image.id}`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-center text-white mt-2">{image.id}</div>
        </div>
      ))}
    </div>
  </div>
);
}

export default function HomePage() {
  return (
<main className="flex min-h-screen w-full flex-col items-center justify-center bg-black px-4 py-8 text-white sm:px-6 sm:py-12">
      <SignedOut>
        <div className="w-full max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            You're not signed in
          </h1>
          <p className="text-base text-gray-400 sm:text-lg">
            Please sign in above to continue.
          </p>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="w-full max-w-3xl space-y-6 text-center">
          <h1 className="text-2xl font-semibold sm:text-3xl">Welcome back!</h1>
          <Images />
        </div>
      </SignedIn>
    </main>
  );
}

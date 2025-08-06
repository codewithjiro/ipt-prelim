import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { UploadDialog } from "~/_components/upload-dialog";
import { UploadButton } from "~/utils/uploadthing";

async function Images() {
  const mockUrls = ["https://imageio.forbes.com/specials-images/imageserve/664b9c049314ec4607e8ee46/Porsche-Sonderwunsch-Haus--The-Taycan-4S-Cross-Turismo-For-Jennie-Ruby-Jane---/0x0.jpg?format=jpg&crop=2432,1824,x0,y291,safe&width=960", "https://variety.com/wp-content/uploads/2024/09/Final-Jennie-Partnership-Announce-Photo-PC_-Songyi-Yoon-e1725833165699.png?w=985&h=657&crop=1", "https://v4sy6yfpwf.ufs.sh/f/JmDEnt4NAnPrL8xmmSMQzKH3ekUJYjsGwSFOlZCVD7xEA9XR", "https://v4sy6yfpwf.ufs.sh/f/JmDEnt4NAnPrvcpPH1ukBeiRfcToqlFLb8Mpa0IgWGQjP2NZ"];

  const images = mockUrls.map((url, index) => ({
    id : index + 1,
    url,

  }))

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
              src={image.url}
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

"use client";

import { Label } from "@radix-ui/react-label";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { UploadButton } from "~/utils/uploadthing";

export function UploadDialog() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(
    null,
  );
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImageName(file.name);
      setSelectedImageUrl(URL.createObjectURL(file));
    } else {
      setSelectedImageName(null);
      setSelectedImageUrl(null);
      toast.error(`Please select a valid image file.`);
    }
  };

  const handleImageUpload = async () => {
    if (!inputRef.current?.files?.length) {
      toast.warning(<span className="text-lg">No File Selected!</span>);
      return;
    }
  };

  return (
     // <UploadButton
    //   endpoint="imageUploader"
    //   onClientUploadComplete={(res) => {
    //     // Do something with the response
    //     console.log("Files: ", res);
    //     // alert("Upload Completed");
    //     toast.success("Upload Completed");
    //     router.refresh();
    //   }}
    //   onUploadError={(error: Error) => {
    //     // Do something with the error.
    //     // alert(`ERROR! ${error.message}`);
    //     toast.error(`ERROR! ${error.message}`);
    //   }}
    // />
      <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Upload Image</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Select an image to upload. Click save when &apos; re done;
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2"> 
            {selectedImageUrl !== null && (
              <img 
              src={selectedImageUrl}
              alt={selectedImageName || "Selected Image"}
              className="w-full rounded-md object-cover" />
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant={"outline"} onClick={() => inputRef.current?. click()}>
              <Upload />
            </Button>
            <input 
            type="file" 
            ref={inputRef} 
            className="sr-only" 
            accept="image"
            onChange={handleImageSelect}
            />
            {setSelectedImageName !== null && (
              <div>Selected Image: {selectedImageName}</div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

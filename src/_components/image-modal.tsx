"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { DeleteButton } from "./delete-button";
import { X } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";

interface ImageModalProps {
  image: {
    id: number;
    fileName: string | null;
    imageName: string | null;
    description: string | null;
    imageUrl: string;
    userId: string;
    createdAt: Date;
  };
  children: React.ReactNode;
}

export function ImageModal({ image, children }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [uploaderInfo, setUploaderInfo] = useState<{ fullName: string } | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (isOpen && !uploaderInfo) {
      setIsLoading(true);
      fetch(`/api/user/${image.userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setUploaderInfo({ fullName: data.fullName });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching uploader info:", error);
          setUploaderInfo({ fullName: "Unknown" });
          setIsLoading(false);
        });
    }
  }, [isOpen, uploaderInfo, image.userId]);

  return (
    <div>
      <div 
        onClick={() => setIsOpen(true)} 
        className="cursor-pointer"
      >
        {children}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="min-h-[85vh] max-w-6xl p-0 overflow-hidden rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] h-full">
            {/* Image Container */}
            <div className="bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4 lg:p-8 relative">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={image.imageUrl}
                  alt={image.imageName || image.fileName || String(image.id)}
                  className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
                />
              </div>
            </div>
            
            {/* Details Container */}
            <div className="bg-white dark:bg-gray-900 flex flex-col h-full border-l dark:border-gray-800">
              <DialogHeader className="px-6 py-4 border-b dark:border-gray-800">
                <div className="flex justify-between items-center">
                  <DialogTitle className="text-lg font-semibold truncate max-w-[80%]">
                    {image.imageName || image.fileName}
                  </DialogTitle>
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Uploaded By
                  </h3>
                  {isLoading ? (
                    <Skeleton className="h-6 w-40 rounded-md" />
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {uploaderInfo?.fullName?.charAt(0) || "?"}
                        </span>
                      </div>
                      <p className="font-medium dark:text-white">
                        {uploaderInfo?.fullName}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Description
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {image.description || (
                        <span className="italic text-gray-400">No description provided</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Created At
                  </h3>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {new Date(image.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <DeleteButton idAsNumber={image.id} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
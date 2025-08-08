import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function TopNav() {
  return (
     <nav className="flex w-full items-center justify-between bg-gradient-to-r from-gray-900 via-black to-gray-900 px-6 py-4 shadow-md">
      <div>TalkMate+</div>
      <div>
        <SignedOut>
          <SignInButton mode="modal"/>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

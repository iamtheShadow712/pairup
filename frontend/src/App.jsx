import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from '@clerk/clerk-react';

function App() {
  return (
    <div className='min-h-screen bg-[#242424] text-white flex items-center jusce'>
      <div className='mx-auto text-center'>
        <h1>Welcome to PairUp</h1>
        <SignedOut>
          <SignInButton mode='modal'>
            <button className="border w-30 text-lg font-bold rounded-lg bg-violet-500 cursor-pointer hover:bg-violet-600"></button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default App
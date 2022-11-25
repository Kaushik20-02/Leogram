import { getProviders, signIn } from "next-auth/react"

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <div className="mt-10 flex flex-col items-center
          ">
          <div className="">
          <p className='font-bold text-[3.5rem]'>
            Leo<span className='text-purple-500'>gram</span></p> 
           <div className="flex items-center justify-center
          w-full h-full mt-14">
          <button onClick={() => signIn(provider.id,
            {callbackUrl: '/'})}
            className='p-4 bg-red-300 rounded-[1rem]
            font-semibold hover:scale-50 duration-300 hover:bg-red-500'>
               {/* To enter main page*/}
            Sign in with {provider.name}
          </button>
        </div>
        </div>
        </div>
        </div>
      ))}
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
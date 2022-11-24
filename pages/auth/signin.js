import { getProviders, signIn } from "next-auth/react"

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <div className="">
          <div className="flex items-center justify-center
          w-full h-full mt-24">
          <button onClick={() => signIn(provider.id,
            {callbackUrl: '/'})}> {/* To enter main page*/}
            Sign in with {provider.name}
          </button>
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
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'


const Nav = () => {
  const { data: session } = useSession()
  const [providers, setProviders] = useState<any | null>(null)
  const [toggleDropDown, setToggleDropdown] = useState(false)

  /* 1:08:25 */
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'          
          alt='Promptopia Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      { /* Desktop Navigation */ }
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/prompt/create' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={() => signOut()} className='outline_btn'>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session.user.image ? session.user.image : ''}
                alt='Profile'
                width={37}
                height={37}
                className='rounded-full h-auto'
                onClick={() => setToggleDropdown((prev) => !prev)}
              />
            </Link>
          </div>
        ): (
          <>
            {
              providers && Object.values(providers).map(
                (provider: any) => (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => signIn()}
                    className='black_btn'
                  >
                    Sign In
                  </button>
                )
              )
            }
          </>
        )}
      </div>

      { /* Mobile Navigation */ }
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session.user.image ? session.user.image : ''}
              alt='Profile'
              width={37}
              height={37}
              className='rounded-full h-auto'
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropDown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/prompt/create'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  className='mt-5 w-full black_btn'
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ): (
          <>
            <div>
              <button
                type='button'
                onClick={() => signIn()}
                className='black_btn'
              >
                Sign In
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav

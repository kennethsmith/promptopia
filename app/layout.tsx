import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'
import connectToDB from '@utils/database'
import { getSession } from 'next-auth/react'
import { Suspense } from 'react'

export const metadata = {
    title: 'Promptopia',
    description: 'Discover and Share AI Prompts'
}

interface Param {
  children: React.ReactNode,
}

const RootLayout = async (param: Param) => {

  const session = await getSession();
  await connectToDB()
  
  return (
    <html lang='en'>
      <body>
        <Provider session={session}>
          <div className='main'>
              <div className='gradient' />
          </div>
          <Suspense>
            <main className='app'>
              <Nav />
              {param.children}
            </main>
          </Suspense>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout

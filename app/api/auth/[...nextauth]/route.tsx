import User from '@models/user'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'


const google = GoogleProvider({
  clientId: process.env.GOOGLE_ID ? process.env.GOOGLE_ID : '',
  clientSecret: process.env.GOOGLE_SECRET ? process.env.GOOGLE_SECRET : ''
})

const github = GitHubProvider({
  clientId: process.env.GITHUB_ID ? process.env.GITHUB_ID : '',
  clientSecret: process.env.GITHUB_SECRET ? process.env.GITHUB_SECRET : ''
})

const creds = CredentialsProvider({
  // The name to display on the sign in form (e.g. "Sign in with...")
  name: "Credentials",
  // `credentials` is used to generate a form on the sign in page.
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  // You can pass any HTML attribute to the <input> tag through the object.
  credentials: {
    email: { label: "Email", type: "text", placeholder: "jsmith@email.com" },
    password: { label: "Password", type: "password" }
  },
  
  async authorize(credentials, req) {
    // Add logic here to look up the user from the credentials supplied
    const users = [
      { id: "018fd596-90af-7012-bd0e-6536c0fe039a", name: "Kevin Smith", username: "ksmith", email: "kevin.smith@email.com", image: "/assets/images/users/ksmith.png", password: "123" },
      { id: "018fd596-90af-7012-bd0e-6536c0fe039b", name: "Alicia Jones", username: "ajones", email: "alicia.jones@email.com", image: "/assets/images/users/ajones.png", password: "456" },
    ]

    if (credentials) {
      // Any object returned will be saved in `user` property of the JWT
      const user = users.find((u) => u.email === credentials.email && u.password === credentials.password)
      return user ? user : null
    } else {
      // If you return null then an error will be displayed advising the user to check their details.
      // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      return null
    }
  }
})

const handler = NextAuth({
    providers: [creds],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        try {
          if(user) {
            const lname = user.name ? user.name : ''
            const lemail = user.email ? user.email: ''
            return true
          } else {
            return false
          }
        } catch (error) {
            console.log(error)
            return false;
        }
      },      
      async session({ session, user, token }) {
        try {
          if(session.user) {
            let sessionUser = await User.findOne( { email: session.user.email } )
            if(!sessionUser) {
              await User.create(
                {
                  email: session.user.email,
                  username: session.user.email,
                  image: session.user.image
                }
              )
              sessionUser = await User.findOne( { email: session.user.email } )
            }
          }
          return session
        } catch (error) {
            console.log(error)
        }
        return session
      },
    }
})

export { handler as GET, handler as POST }

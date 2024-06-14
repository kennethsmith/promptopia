import Prompt from '@models/prompt'
import User from '@models/user'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export const GET = async(req: NextRequest, context: { params: any }) => {
    try {
        const secret = process.env.NEXTAUTH_SECRET
        const token = await getToken( {req, secret} )
        if( token ) {
            if(token.email === context.params.email) {
                const user = await User.findOne( { email: context.params.email } )
                const prompts = await Prompt.find({ creator:  user._id }).populate('creator')
                return new Response(JSON.stringify(prompts), {status: 200})
            } else {
                return new Response(JSON.stringify( { reason : 'Forbidden. Access is restricted.' } ), {status: 403})
            }
        } else {
            return new Response(JSON.stringify( { reason : 'Unauthorized. Autheniticaton failed.' } ), {status: 401})
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify( { reason : 'Internal Server Error. There was an error on the server.' } ), { status: 500 } )
    }
}
import Prompt from '@models/prompt'
import User from '@models/user'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export const POST = async(req: NextRequest) => {
    try {
        const obj =  await req.json()
        const secret = process.env.NEXTAUTH_SECRET
        const token = await getToken( {req, secret} )

        if( token ) {
            if(token.email === obj.email) {
                let sessionUser = await User.findOne( { email: token.email } )
                if(!sessionUser) {
                    await User.create({
                        email: token.email,
                        username: token.email,
                        image: token.image
                    })
                    sessionUser = await User.findOne( { email: token.email } )
                }
    
                const prompt = new Prompt({
                    creator: sessionUser._id,
                    prompt: obj.prompt,
                    tag: obj.tag
                })
    
                await prompt.save()
    
                return new Response(JSON.stringify(prompt), { status: 201 })
            } else {
                return new Response(JSON.stringify( { reason : 'Forbidden. Access is restricted.' } ), {status: 403})
            }
        } else {
            return new Response(JSON.stringify( { reason : 'Unauthorized. Autheniticaton failed.' } ), {status: 401})
        }
    } catch (error) {
        console.log(`error: ${error}`)
        return new Response('Failed to create response.', { status: 500 } )
    }
}

export const GET = async(req: NextRequest) => {
    try {
        const secret = process.env.NEXTAUTH_SECRET
        const token = await getToken( {req, secret} )
        let query:any = {}
        let prompts = []
        
        if(req.nextUrl.searchParams.get('email')) {
            const user = await User.findOne( { email: req.nextUrl.searchParams.get('email') } )
            if(user) {
                query['creator'] = user._id
            }
        }
        prompts = await Prompt.find(query).populate('creator')
            
        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify( { reason : 'Internal Server Error. There was an error on the server.' } ), { status: 500 } )
    }
}
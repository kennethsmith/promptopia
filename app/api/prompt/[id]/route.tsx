import Prompt from '@models/prompt'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

type Params = {
    id: string
}

export const GET = async(req: NextRequest, context: { params: Params }) => {
    try {
        const prompt = await Prompt.findById(context.params.id).populate('creator')
        if(!prompt) {
            return new Response( JSON.stringify( { reason : 'Not Found. Prompt does not exist.' } ), {status: 404} )
        } else {
            return new Response(JSON.stringify(prompt), {status: 200} )
        }
    } catch (error) {
        console.log(error)
        return new Response('Failed to create response.', { status: 500 } )
    }
}

export const PATCH = async(req: NextRequest, context: { params: Params }) => {
    try {
        const obj =  await req.json()
        const secret = process.env.NEXTAUTH_SECRET
        const token = await getToken( {req, secret} )

        if( token ) {
            const prompt = await Prompt.findById(context.params.id).populate('creator')
            if (prompt) {
                if (token.email === prompt.creator.email) {
                    prompt.prompt = obj.prompt
                    prompt.tag = obj.tag
                    await Prompt.findByIdAndUpdate(prompt._id, prompt)
                    return new Response( JSON.stringify(prompt), {status: 200})
                } else {
                    return new Response( JSON.stringify( { reason : 'Forbidden. Access is restricted.' } ), {status: 403} )
                }
            } else {
                return new Response( JSON.stringify( { reason : 'Not Found. Prompt does not exist.' } ), {status: 404} )
            }
        } else {
            return new Response( JSON.stringify( { reason : 'Unauthorized. Autheniticaton failed.' } ), {status: 401} )
        }
    } catch (error) {
        console.log(`error: ${error}`)
        return new Response('Failed to create response.', { status: 500 } )
    }
}

export const DELETE = async(req: NextRequest, context: { params: Params }) => {
    try {
        const secret = process.env.NEXTAUTH_SECRET
        const token = await getToken( {req, secret} )

        if( token ) {
            const prompt = await Prompt.findById(context.params.id).populate('creator')
            if(prompt) {
                if(token.email === prompt.creator.email) {
                    await Prompt.findByIdAndDelete(context.params.id)
                    return new Response( JSON.stringify(prompt), {status: 200} )
                } else {
                    return new Response( JSON.stringify( { reason : 'Forbidden. Access is restricted.' } ), {status: 403} )
                }
            } else {
                return new Response( JSON.stringify( { reason : 'Not Found. Prompt does not exist.' } ), {status: 404} )
            }
        } else {
            return new Response( JSON.stringify( { reason : 'Unauthorized. Autheniticaton failed.' } ), {status: 401} )
        }
    } catch (error) {
        console.log(`error: ${error}`)
        return new Response('Failed to create response.', { status: 500 } )
    }
}
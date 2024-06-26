'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

const ProfilePage = () => {
    const router = useRouter();
    const [ posts, setPosts ] = useState([])
    const { data: session } = useSession()
        
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`api/users/${session?.user?.email}/posts`)
            const data = await response.json()
            setPosts(data)
        }

        if(session?.user?.email) {
            fetchPosts()
        }
    }, [session?.user?.email])

    const handleEdit = (post: any) => {
        router.push(`/prompt/edit?id=${post._id}`)
    }

    const handleDelete = async (post: any) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id}`, { method: 'DELETE' })

                const filteredPosts = posts.filter((p: any) => p._id !== post._id)
                setPosts(filteredPosts)

            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page.'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default ProfilePage

import Link from 'next/link'

export default function ItemDeleted({ path = "projects" }) {
    return (
        <div className="text-center text-green-600 mt-5">
            <p className='text-red-500'>Task not found or has been deleted</p>
            <Link href={`/${path}`}>Back</Link>
        </div>
    )
}

"use client"

import useProjectsStore from "@/app/store"

export default function Page({ params }) {
    const { individualPost } = useProjectsStore();

    return (
        <div>page {individualPost.id}</div>
    )
}

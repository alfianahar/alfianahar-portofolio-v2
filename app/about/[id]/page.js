import Link from "next/link"

async function getPeople(id) {
    const detailUser = await fetch(`https://dummyjson.com/users/${id}`)
    return detailUser.json()
}

export default async function PeoplePage({ params }) {
    const detail = await getPeople(params.id)

    return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "3rem" }}>
            <h1>{detail.firstName} {detail.lastName} </h1>
            <Link href="/about">Back</Link>
        </div>
    )
}
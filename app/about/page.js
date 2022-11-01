async function getData() {
    const data = await fetch("https://dummyjson.com/users?limit=6")
    return data.json()
}

export default async function Page() {
    const { users } = await getData();
    // console.log({ users })
    return (
        <>
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", fontSize: "2rem" }}>
                <h1>About Page</h1>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1rem", fontSize: "1rem" }}>
                {
                    users.map((people) => (
                        <div key={people.id} style={{ border: "4px solid black", borderRadius: "0.375rem", padding: "1rem" }}>
                            <img src={people.image} alt={people.maidenName} style={{ padding: "0.5rem" }} />
                            <h1>{people.firstName} {people.lastName}</h1>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
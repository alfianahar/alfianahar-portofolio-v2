import Link from "next/link";

async function getData() {
  const data = await fetch("https://dummyjson.com/users?limit=6");
  return data.json();
}

export default async function Page() {
  const { users } = await getData();
  // console.log({ users })
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          marginTop: "2rem",
        }}
      >
        <h1>About Page</h1>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1rem",
          fontSize: "1rem",
          padding: "0 4rem",
        }}
      >
        {users?.map((people) => (
          <Link
            key={people.id}
            href={`/about/${[people.id]}`}
            style={{ border: "4px solid white", borderRadius: "0.375rem", padding: "1rem" }}
          >
            <div
              aria-hidden="true"
              style={{
                display: "grid",
                placeItems: "center",
                aspectRatio: "1",
                width: "100%",
                background: "#111",
                color: "#fff",
              }}
            >
              {people.firstName?.[0]}
              {people.lastName?.[0]}
            </div>
            <h1 style={{ textAlign: "center" }}>
              {people.firstName} {people.lastName}
            </h1>
          </Link>
        ))}
      </div>
    </>
  );
}

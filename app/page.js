import Link from "next/link";

export default function Page() {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "3rem" }}>
                <h1 className="font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text">WELCOME TO MY PAGE</h1>
                <Link href="/bio"> <button>Go to my bio</button> </Link>
            </div>
        </>
    )
}
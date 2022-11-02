import Link from "next/link";

export default function BioPage() {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "3rem" }}>
                <h1>Bio Page</h1>
                <Link href="/">Back to Home</Link>
            </div>
        </>
    )
}
import Navbar from "../navbar";

export default function Page() {
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <h1 >Hello World</h1>
            </div>
        </>
    )
}
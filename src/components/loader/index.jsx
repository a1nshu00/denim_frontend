import "./loader.css"

export default function Loader({ loading = false, block = false }) {
    if (!loading) return <></>

    const loader = <span className="smart-loader"></span>

    if (!!block)
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                {loader}
            </div>
        )
    return loader
}

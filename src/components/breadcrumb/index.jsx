export default function Breadcrumb({}) {
    return (
        <div className="card">
            <div className="card-body">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="javascript:void(0);">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="javascript:void(0);">Library</a>
                        </li>
                        <li className="breadcrumb-item active">Data</li>
                    </ol>
                </nav>
            </div>
        </div>
    )
}

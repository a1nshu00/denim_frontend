export default function Card({children, title, header}) {
    return (
        <div className="card">
            {title && <h5 className="card-header">{title}</h5>}
            {header}
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

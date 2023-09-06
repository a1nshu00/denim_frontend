export default function CardHeader({ title }) {
    if (!title) return <></>
    return <h5 className="card-header">{title}</h5>
}

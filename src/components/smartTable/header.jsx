

export default function TableHeader({ columns }) {
    if (!columns || columns.length == 0) return <></>
    return (
        <thead>
            <tr>
                {columns.map(function (item, i) {
                    return <th key={i}>{item.name}</th>
                })}
            </tr>
        </thead>
    )
}

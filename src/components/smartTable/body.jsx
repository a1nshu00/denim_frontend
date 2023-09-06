import { Loader } from "@components"

export default function TableBody({ items, columns, loading }) {
    return (
        <tbody>
            {items.map(function (row, i) {
                return <TableRow key={i} row={row} columns={columns} />
            })}
            {/* {loading && (
                <tr>
                    <td colSpan={columns.length + 1}>
                        <Loader loading={loading} block="true" />
                    </td>
                </tr>
            )} */}
        </tbody>
    )
}

function TableRow({ columns, row }) {
    return (
        <tr>
            {columns.map(function (column, i) {
                return <TableCell row={row} column={column} key={i} />
            })}
        </tr>
    )
}

function TableCell({ column, row }) {
    let cellItem = null
    if (!!column.selector) cellItem = column.selector(row)

    if (!!column.badge) {
        const badge = column?.badge(row)
        cellItem = (
            <span className={`badge bg-label-${badge} me-1`}>{cellItem}</span>
        )
    }

    if (!!column.strong) {
        cellItem = <strong>{cellItem}</strong>
    }

    if (!!column.action) {
        cellItem = (
            <ActionButtons
                actions={column.action}
                selector={cellItem}
                row={row}
            />
        )
    }

    return <td>{cellItem}</td>
}

function ActionButtons({ actions, selector, row }) {
    return (
        <div className="dropdown">
            <button
                type="button"
                className="btn p-0 dropdown-toggle hide-arrow"
                data-bs-toggle="dropdown"
            >
                <i className="bx bx-dots-vertical-rounded"></i>
            </button>
            <div className="dropdown-menu">
                {actions.map(function (action, i) {
                    return (
                        <a
                            className="dropdown-item"
                            key={i}
                            onClick={() =>
                                action.onClick
                                    ? action.onClick(selector, row)
                                    : () => false
                            }
                        >
                            {action.icon} {action.name}
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

import { useSelector, useDispatch } from 'react-redux'
// import { updateSelectedProducts } from '@store/feature/productPopup.js'
import { updateOrderProducts } from '@store/feature/orderProduct.js'
import { useEffect } from "react"


export default function OrderItemRow({ row }) {
    // const orderProducts = useSelector((state) => state.orderProduct.orderProducts)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     console.log({ orderProducts })
    // }, [orderProducts])

    return (
        <tr>
            <td>{row.gID}</td>
            <td>{row.name}</td>
            <td>{row.variants?.length || 0}</td>
            <td>{row.quantity}</td>
            <td>{row.price}</td>
            <td><button type="button" onClick={() => remove(index)} className="btn btn-sm btn-danger ms-3">x</button></td>
        </tr>
    )
}


import { Card } from "@components"
import { useEffect, useState } from "react"
import Loader from "../loader"
import TableBody from "./body"
import TableCaption from "./caption"
import TableHeader from "./header"

export default function SmartTable({
    columns = [],
    api = false,
    apiOptions={ limit:10, page:1, },
    caption = false,
    title = false,
    data = false,
    header,
    update=false
}) {
    const [dataList, setDataList] = useState([])
    const [loadingDataList, setLoadingDataList] = useState(true)
    const [currentPageInDataList, setCurrentPageInDataList] = useState(1)

    useEffect(function () {
        if (api !== false) fetchDataList({
            ...apiOptions, page:currentPageInDataList,
        })
        else setDataList(data);
    }, [update])

    // useEffect(function () {
    //     if (api !== false && data !== false)  setDataList(data);
    // }, [data])

    const fetchDataList = async (options) => {
        setLoadingDataList(true)
        const response = await api(options)
        console.log('fetched data list')
        if (!response.status) return console.error(response.message)
        setDataList(response.data)
        setLoadingDataList(false)
    }

    return (
        <Card title={title} header={header}>
            <div className="table-responsive text-nowrap" style={{ position:"relative" }} >
                <table className="table">
                    <TableCaption caption={caption} margin={data.length<3}  loading={loadingDataList} />
                    <TableHeader columns={columns}  />
                    <TableBody items={dataList} columns={columns} />
                </table>
                <SmartLoader loading={loadingDataList} />
            </div>
        </Card>
    )
}


const SmartLoader = ({loading}) => {
    return <div style={{ 
            height: '100%', width: '100%', backgroundColor: '#ffffffa3', justifyContent: 'center', alignItems: 'center',
            position:"absolute", top:'50%', left:"50%", display:loading? 'flex' : 'none',transform: `translate(-50%, -50%)`
        }}>
        <Loader loading={loading} />
    </div>
}


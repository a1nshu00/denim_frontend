export default function TableCaption({
    caption,
    margin = false,
    loading = false,
}) {
    if (!caption) return <></>
    return (
        <>
            <caption style={{ marginTop: margin ? "60px" : "0px" }}>
              {loading ? 'Loading': ''}  {caption}  {loading ? '...': ''} 
            </caption>
        </>
    )
}

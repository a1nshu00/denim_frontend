export default function LayoutModel({ footer, children, title, size = 'xl', id = 'model' }) {
    return (
        <div className="modal fade" id={id} tabIndex="-1" style={{ display:"none" }} aria-hidden="true">
            <div className={`modal-dialog modal-${size}`} role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel4">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    )
}
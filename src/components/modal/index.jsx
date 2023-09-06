import { useEffect } from "react"

export default function Modal({visible,  children, title, footer, modelClosed, fullScreen }) {

    useEffect(function(){
        // const bsModal = new bootstrap.Modal(document.getElementById('bsModal'))
        // visible? bsModal.show() : bsModal.hide()

        visible ? $('#bsModal').modal('show') : $('#bsModal').modal('hide');

    },[visible])

    return (
        <div
            className="modal fade"
            id="bsModal"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
            style={{ display:'none' }}
        >
            <div className={`modal-dialog ` + (fullScreen ? 'modal-fullscreen' : ' modal-xl' )} role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel4">
                            {title}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={()=>modelClosed()}
                        ></button>
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer">{footer}</div>
                </div>
            </div>
        </div>
    )
}
export default class Toast {
    static dispatch(options = {}) {
        const { text, title, type = 'info', time } = options;
        const oldToaster  =  document.getElementById('toast');
        
        if (!!oldToaster) oldToaster.style.display = 'none';
        
        document.body.insertAdjacentHTML('afterbegin', toastContainer(text, title, type, time));
        const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('toast'));
        toast.show();
    }
}

function toastContainer(text, title, type, time) {
    const titleType = Boolean(text) ? 'strong' : 'small';

    return `<div class="position-fixed bottom-0 end-0 p-3 " style="z-index:10000">
        <div id="toast" class="toast bg-${type || 'info'}" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                ${title ? `<${titleType} class="me-auto">${title}</${titleType} >` : ''}  ${time ? `<small>${time}</small>` : ''}
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            ${text ? `<div class="toast-body">${text}</div>` : ''}
        </div>
    </div>`;
}
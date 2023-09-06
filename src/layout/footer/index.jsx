
export default function LayoutFooter() {
    return (
        <footer className="content-footer footer bg-footer-theme">
            <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div className="mb-2 mb-md-0">
                    ©{new Date().getFullYear()}, made with ❤️ by <span className="footer-link fw-bolder">Tony</span>
                    {/* <a target="_blank" className="footer-link fw-bolder">Tony</a> */}
                </div>
                <div>
                    {/*<a href="#" target="_blank" className="footer-link me-4">More</a> */}
                    {/* <a oldhref="#" target="_blank" className="footer-link me-4">
                        Support
                    </a> */}
                </div>
            </div>
        </footer>
    );
}

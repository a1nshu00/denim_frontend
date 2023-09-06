import LayoutFooter from "../footer"
import LayoutHeader from "../header"
import LayoutModel from "../modal"
import LayoutSidebar from "../sidebar"

// import { LayoutSidebar } from '@layout'
// LayoutSidebar
function LayoutMain({ children, withoutSidebar=false }) {

    if(withoutSidebar){
        return <div className="container-xxl">{children}</div>
    }

    

    

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                {/* <!-- Menu --> */}
                
                <LayoutSidebar />
                {/* <!-- / Menu --> */}
                {/* <!-- Layout container --> */}
                <div className="layout-page">
                    {/* <!-- Navbar --> */}
                        <LayoutHeader />
                    {/* <!-- / Navbar --> */}
                    {/* <!-- Content wrapper --> */}
                    <div className="content-wrapper">
                        {/* <!-- Content --> */}
                        <div className="container-xxl flex-grow-1 container-p-y">
                        <div className="card">
                            <div className="card-body">
                                {children}
                            </div>
                        </div>
                        </div>
                        <LayoutModel id={'cutomModel'} title="model titlkedsfd">
                            <h1>sdffgf</h1>
                        </LayoutModel>
                        {/* <!-- / Content --> */}
                        {/* <!-- Footer --> */}
                        <LayoutFooter />
                        {/* <!-- / Footer --> */}

                        <div className="content-backdrop fade"></div>
                    </div>
                    {/* <!-- Content wrapper --> */}
                </div>
                {/* <!-- / Layout page --> */}
            </div>

            {/* <!-- Overlay --> */}
            <div className="layout-overlay layout-menu-toggle"></div>
        </div>
    )
}

export default LayoutMain

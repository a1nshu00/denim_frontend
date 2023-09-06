import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { AuthServiceProvider } from "../../provider/auth";





export default function LayoutSidebar() {
    const location = useLocation();
    // const Auth     = useAuth();
    const { Auth } = AuthServiceProvider;
    
    useEffect(function(){
        console.log(AuthServiceProvider)
        console.log(Auth.gate('product:index'));
        // console.log({Auth})
    }, []);

    return (
        <div
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-menu-theme"
        >
            <div className="app-brand demo">
                <a oldhref="index.html" className="app-brand-link">
                    <span className="app-brand-logo demo"></span>
                    <span className="app-brand-text demo menu-text fw-bolder ms-2" style={{ textTransform:"uppercase" }}>DENIM HIKE</span>
                </a>
                <a
                    oldhref="javascript:void(0);"
                    className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
                >
                    <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </a>
            </div>

            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1">
                {/* <!-- Dashboard --> */}

                <li className={`menu-item  ${['/dashboard', '/'].includes(location.pathname) ? 'active' : '' }`}>
                    <Link to={'/'} className="menu-link">
                        <i className="menu-icon tf-icons bx bx-home-circle"></i>
                        <div data-i18n="Analytics">Dashboard</div>
                    </Link>
                </li>

                <li className="menu-header small text-uppercase">
                    <span className="menu-header-text">Inventory</span>
                </li>
                <li className={`menu-item  ${('/products' == location.pathname) ? 'active open' : '' }`} onClick={(e) => e.currentTarget.classList.add('open')}>
                    <a oldhref="javascript:void(0);" className="menu-link menu-toggle"><i className="menu-icon tf-icons bx bxl-product-hunt"></i><div data-i18n="Authentications">Products</div></a>
                    <ul className="menu-sub">
                        <li className={`menu-item ${('/products' == location.pathname) && (['', '?'].includes(location.search)) ? 'active' : '' }`}>
                            <Link to={'/products'} className="menu-link "><div data-i18n="Support">All</div></Link>
                        </li>
                        <li className={`menu-item ${('/products' == location.pathname) && (location.search == '?status=low-quantity') ? 'active' : '' }`}>
                            <Link to={'/products?status=low-quantity'} className="menu-link "><div data-i18n="Support">Low Quantity</div></Link>
                        </li>
                        <li className={`menu-item ${('/products' == location.pathname) && (location.search == '?status=out-of-stock') ? 'active' : '' }`}>
                            <Link to={'/products?status=out-of-stock'} className="menu-link "><div data-i18n="Support">Out of stock</div></Link>
                        </li>
                    </ul>
                </li>

                <li className={`menu-item  ${('/orders' == location.pathname) ? 'active open' : '' }`} onClick={(e) => e.currentTarget.classList.add('open')}>
                    <a oldhref="javascript:void(0);" className="menu-link menu-toggle"><i className="menu-icon tf-icons bx bx-cart-alt"></i><div data-i18n="Authentications">Orders</div></a>
                    <ul className="menu-sub">
                        <li className={`menu-item ${('/orders' == location.pathname) && (['', '?'].includes(location.search)) ? 'active' : '' }`}>
                            <Link to={'/orders'} className="menu-link"><div data-i18n="Support">All</div></Link>
                        </li>
                        <li className={`menu-item ${('/orders' == location.pathname) && (location.search == '?status=draft') ? 'active' : '' }`}>
                            <Link to={'/orders?status=draft'} className="menu-link"><div data-i18n="Support">Draft</div></Link>
                        </li>
                        <li className={`menu-item ${('/orders' == location.pathname) && (location.search == '?status=in-progress') ? 'active' : '' }`}>
                            <Link to={'/orders?status=in-progress'} className="menu-link"><div data-i18n="Support">In Progress</div></Link>
                        </li>
                        <li className={`menu-item ${('/orders' == location.pathname) && (location.search == '?status=completed') ? 'active' : '' }`}>
                            <Link to={'/orders?status=completed'} className="menu-link"><div data-i18n="Support">Completed</div></Link>
                        </li>
                    </ul>
                </li>

                { Auth.userType('admin') && <>
                        <li className="menu-header small text-uppercase">
                            <span className="menu-header-text">Shop</span>
                        </li>
                        <li className={`menu-item ${('/shops' == location.pathname) ? 'active open' : '' }`} onClick={(e) => e.currentTarget.classList.add('open')}>
                            <a oldhref="javascript:void(0);" className="menu-link menu-toggle"><i className="menu-icon tf-icons bx bx-store-alt"></i><div data-i18n="Authentications">Shops</div></a>
                            <ul className="menu-sub">
                                <li className={`menu-item ${('/shops' == location.pathname) && (['', '?'].includes(location.search)) ? 'active' : '' }`}>
                                    <Link to={'/shops'} className="menu-link "><div data-i18n="Support">All</div></Link>
                                </li>
                                <li className={`menu-item ${('/shops' == location.pathname) && (location.search == '?suspended=true') ? 'active' : '' }`}>
                                    <Link to={'/shops?suspended=true'} className="menu-link "><div data-i18n="Support">Suspended</div></Link>
                                </li>
                            </ul>
                        </li>
                    </>
                }

                { Auth.userType('admin') && <>
                        <li className="menu-header small text-uppercase">
                            <span className="menu-header-text">Master</span>
                        </li>
                        <li className={`menu-item ${('/categories' == location.pathname) ? 'active open' : '' }`}  onClick={(e) => e.currentTarget.classList.add('open')} >
                            <a  className="menu-link menu-toggle"><i className="menu-icon tf-icons bx bx-category-alt"></i><div data-i18n="Authentications">Category</div></a>
                            <ul className="menu-sub">
                                <li className={`menu-item ${('/categories' == location.pathname) && (['', '?'].includes(location.search)) ? 'active' : '' }`}>
                                    <Link to={'/categories'} className="menu-link "><div data-i18n="Support">All</div></Link>
                                </li>
                                <li className={`menu-item ${('/categories' == location.pathname) && (location.search == '?subCategories=true') ? 'active' : '' }`}>
                                    <Link to={'/categories?subCategories=true'} className="menu-link "><div data-i18n="Support">Sub Categories</div></Link>
                                </li>
                            </ul>
                        </li>
                    </>
                }
 
                <li className="menu-header small text-uppercase">
                    <span className="menu-header-text">Misc</span>
                </li>
                <li className="menu-item">
                    <a target="_blank" className="menu-link">
                        <i className="menu-icon tf-icons bx bx-support"></i>
                        <div data-i18n="Support">Support</div>
                    </a>
                </li>
                <li className="menu-item">
                    <a target="_blank" className="menu-link">
                        <i className="menu-icon tf-icons bx bx-file"></i>
                        <div data-i18n="Documentation">Documentation</div>
                    </a>
                </li>
            </ul>
        </div>
    )
}

import React from 'react';
import { Helmet } from 'react-helmet';

const Header = () => (
    <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>DASHMIN - Hotel Management System</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="img/favicon.ico" rel="icon" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
            <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
            <link href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />
            <link href="css/bootstrap.min.css" rel="stylesheet" />
            <link href="css/style.css" rel="stylesheet" />
        </Helmet>
        <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
            <a href="/reservedroom" className="navbar-brand d-flex d-lg-none me-4">
                <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
            </a>
            <a href="#" className="sidebar-toggler flex-shrink-0">
                <i className="fa fa-bars"></i>
            </a>
            <div className="navbar-nav align-items-center ms-auto">
                <div className="nav-item dropdown">
                    <a href="https://mail.google.com/" className="nav-link" data-bs-toggle="dropdown">
                        <i className="fa fa-envelope me-lg-2"></i>
                        <span className="d-none d-lg-inline-flex">Message</span>
                    </a>
                </div>
            </div>
        </nav>
    </>
);

export default Header;

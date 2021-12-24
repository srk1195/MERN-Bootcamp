import React from 'react';

function Footer() {
    return (
        <>
            {/* Footer */}
            <footer className="my-footer footer bg-dark">
                <div className="container-fluid text-white text-center">
                    If you got any questions, feel free to reach out anytime!
                    <button type="button" className="btn btn-sm btn-custom mx-auto d-block mt-2">
                        Contact Us!
                    </button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        An Amazing <span style={{ color: '#1982c4' }}>MERN</span> Bootcamp
                    </span>
                </div>
            </footer>
        </>
    );
}

export default Footer;

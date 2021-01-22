import React from "react";
import "./Nav.css";

const Navigation = () => {
    return (
        <div className="Navigation-Container">
            <img className="Navigation-Logo" src="https://media.licdn.com/dms/image/C4E0BAQE2nmZshIwV9A/company-logo_200_200/0?e=2159024400&v=beta&t=2rZ7n-f_mLfkkqAxz0B8IVGTELeBH1VTHBm0naezmZw" />
            <div>
                <h2 className="Navigation-Henry">Henry</h2>
                <h2 className="Navigation-Manager">Manager</h2>
            </div>
        </div>
    )
}

export default Navigation;
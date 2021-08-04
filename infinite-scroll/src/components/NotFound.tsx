import '../styles/NotFoundStyle.css';
import '../styles/LoginStyle.css';
const BrokenLink = require('../assets/broken.png') as {default: string};

function NotFound() {
    return (
        <div className="login-container broken-container">
            <img src={BrokenLink.default}  alt="Not Found" height={100} />
            <span className="not-exist">Oops! This page does not exist!</span>
        </div>
    )
}

export default NotFound

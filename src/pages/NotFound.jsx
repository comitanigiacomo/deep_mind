import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-text">
          Sembra che ti sia perso nei meandri della Deep Mind.
        </p>
        <Link to="/" className="notfound-button">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}

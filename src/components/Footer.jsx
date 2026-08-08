import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="ft-brand">
        <span className="ft-name">Kshetragya Cybersec, Ahmedabad, India</span>
        <span className="ft-tag">"Knowers of the Field"</span>
      </div>
      <p className="ft-copy">© {year} Kshetragya Cybersec<br/>All rights reserved.</p>
      <nav aria-label="Footer">
        <ul className="ft-links">
          <li><Link to="/#services">Services</Link></li>
          <li><Link to="/#process">Process</Link></li>
          <li><Link to="/#contact">Contact</Link></li>
        </ul>
      </nav>
    </footer>
  );
}

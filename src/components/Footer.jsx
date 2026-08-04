export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="ft-brand">
        <span className="ft-name">Kshetragya Cybersec · Ahmedabad, India</span>
        <span className="ft-tag">"Knowers of the Field"</span>
      </div>
      <p className="ft-copy">© {year} Kshetragya Cybersec<br/>All rights reserved.</p>
      <nav aria-label="Footer">
        <ul className="ft-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </footer>
  );
}

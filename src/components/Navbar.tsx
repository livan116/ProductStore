'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <ShoppingBag className="me-2" size={24} />
          Product Store
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
   
      </div>
    </nav>
  );
};

export default Navbar;
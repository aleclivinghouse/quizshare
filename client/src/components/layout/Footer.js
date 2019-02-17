import React from 'react';
import './layout.css';
export default () => {
  return(
    <div className="footer-wrapper">
    <footer className="bg-dark text-white p-4 text-center fixed-bottom">
      Copyright &copy; {new Date().getFullYear()} Alec
    </footer>
    </div>
  )
}

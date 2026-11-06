import React from 'react';
import { Outlet, NavLink } from 'react-router';
import { useCart } from '../hooks/useCart';

export function Header() {
  const { count } = useCart();

  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>

      <nav className="nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/cart">
          Cart <span className="badge">{count}</span>
        </NavLink>
        <NavLink to="/orders">Orders</NavLink>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <small>©2026 CampusEats BICS 3301, IIUM</small>
    </footer>
  );
}

export function Layout() {
  return (
    <div className="app-layout">
      <Header />

      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
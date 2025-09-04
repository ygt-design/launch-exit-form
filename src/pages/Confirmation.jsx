import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Confirmation() {
  const location = useLocation();
  const isSeller = location.search.includes('seller=1');
  const isBuyer = location.search.includes('buyer=1');

  return (
    <div className="container">
      <div className="stack">
        <div>
          <h1 className="title" style={{ fontSize: 24, margin: 0 }}>You’re on the list</h1>
          <p className="subtitle" style={{ margin: '6px 0 0' }}>
            {isSeller ? 'We’ll reach out to help you find the right buyer.' :
             isBuyer ? 'We’ll curate opportunities that match your criteria.' :
             'Thanks for joining the waitlist.'}
          </p>
        </div>
        <div role="group" aria-label="Next steps" style={{ display: 'flex', gap: 12 }}>
          <Link to="/sell"><button className="button secondary">Seller form</button></Link>
          <Link to="/buy"><button className="button">Buyer form</button></Link>
        </div>
      </div>
    </div>
  );
}
 

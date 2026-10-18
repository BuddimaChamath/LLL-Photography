import React from 'react';
import { Link } from '../router';

export const NotFoundPage: React.FC = () => (
  <section className="container-site flex min-h-[70vh] flex-col items-center justify-center pb-24 pt-36 text-center">
    <p className="eyebrow">404</p>
    <h1 className="mt-5 font-serif text-5xl font-light sm:text-6xl">This page is out of frame</h1>
    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
      The page you’re looking for doesn’t exist or has moved. Try one of these instead.
    </p>
    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
      <Link to="/" className="btn-solid">
        Home
      </Link>
      <Link to="/portfolio" className="btn-outline">
        Portfolio
      </Link>
    </div>
  </section>
);

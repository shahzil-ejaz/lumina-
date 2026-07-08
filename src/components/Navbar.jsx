import React from 'react';
import PropTypes from 'prop-types';

/**
 * Navbar component
 * Responsive header including site branding/logo and clean minimalist design.
 */
export const Navbar = ({ toggleSidebar }) => {
  return (
    <>
      <header className="bg-surface dark:bg-surface-dim shadow-sm fixed top-0 w-full z-40 transition-all duration-300">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full">
          <div className="flex items-center gap-4">
            <a
              className="font-display-lg text-headline-lg-mobile md:text-headline-lg tracking-tight text-primary dark:text-primary-fixed-dim hover:opacity-80 transition-opacity"
              href="#"
            >
              LUMINA
            </a>
          </div>

          {/* Desktop Nav (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Links could go here */}
          </nav>

          <div className="flex items-center gap-4">
            <button
              className="text-on-surface-variant hover:opacity-80 transition-opacity font-title-md text-title-md cursor-pointer hidden md:block"
              onClick={toggleSidebar}
              tabIndex="0"
            >
              Categories
            </button>
          </div>
        </div>
      </header>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md fixed bottom-0 left-0 w-full flex justify-around items-center py-3 px-4 shadow-[0_-2px_10px_rgba(0,0,0,0.04)] z-40 pb-safe">
        <a
          className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed-dim font-bold hover:text-primary transition-colors active:scale-90 duration-150"
          href="#"
        >
          <span
            className="material-symbols-outlined mb-1"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            explore
          </span>
          <span className="font-label-sm text-label-sm">Discover</span>
        </a>
        <button
          className="flex flex-col items-center justify-center text-outline dark:text-outline-variant hover:text-primary transition-colors active:scale-90 duration-150 cursor-pointer"
          onClick={toggleSidebar}
        >
          <span className="material-symbols-outlined mb-1">grid_view</span>
          <span className="font-label-sm text-label-sm">Categories</span>
        </button>
      </nav>
    </>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

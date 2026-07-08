import React from 'react';
import PropTypes from 'prop-types';

/**
 * CategoryFilters component
 * The horizontally scrollable capsule navigation pill container for sidebar or top.
 */
export const CategoryFilters = ({ categories, activeCategory, setActiveCategory, closeSidebar, sidebarOpen }) => {
  const allCategories = ['All', ...categories];

  return (
    <>
      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={closeSidebar}
      />
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-surface shadow-lg z-50 overflow-y-auto flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 flex justify-between items-center border-b border-outline-variant">
          <h2 className="font-title-md text-title-md text-on-surface">Categories</h2>
          <button 
            className="p-2 rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant"
            onClick={closeSidebar}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <nav className="flex flex-col p-4 gap-2 flex-grow">
          {allCategories.map(category => (
            <button
              key={category}
              className={`w-full text-left px-4 py-3 rounded-lg font-label-md text-label-md transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-on-surface hover:bg-surface-variant'
              }`}
              onClick={() => {
                setActiveCategory(category);
                closeSidebar();
              }}
            >
              {category}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

CategoryFilters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  setActiveCategory: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
};

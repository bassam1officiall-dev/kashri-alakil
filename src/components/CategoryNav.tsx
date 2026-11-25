import { motion } from 'framer-motion';
import { CATEGORIES, CategoryId } from '../data/menu';

interface CategoryNavProps {
  activeCategory: CategoryId;
  onSelectCategory: (categoryId: CategoryId) => void;
}

export function CategoryNav({
  activeCategory,
  onSelectCategory,
}: CategoryNavProps) {
  return (
    <nav
      aria-label="أقسام المنيو"
      className="sticky top-0 z-30 border-b border-[#E6DED6] bg-[#FDFBF7]"
    >
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className={`relative shrink-0 min-h-[46px] py-3 text-sm font-display transition-colors whitespace-nowrap ${
                  isActive
                    ? 'font-extrabold text-[#8F1513]'
                    : 'font-bold text-[#5A4E49] hover:text-[#1A1412]'
                }`}
              >
                {category.title}
                {isActive && (
                  <motion.span
                    layoutId="active-category-underline"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#C41E1C]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

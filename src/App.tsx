import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { CATEGORIES, CategoryId, MENU_ITEMS, MenuItem } from './data/menu';
import {
  buildCartKey,
  calculateCartTotals,
  CartEntry,
  getEffectiveVariant,
} from './utils/cart';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { MenuItemRow } from './components/MenuItemRow';
import { FloatingCartBar } from './components/FloatingCartBar';
import { CheckoutSheet } from './components/CheckoutSheet';
import { PhoneSheet } from './components/PhoneSheet';
import { Footer } from './components/Footer';

export function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('koshary');
  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPhoneSheetOpen, setIsPhoneSheetOpen] = useState(false);

  const sectionRefs = useRef<Partial<Record<CategoryId, HTMLElement | null>>>(
    {}
  );

  // Scroll-spy for sticky category navigation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-category-id') as
              | CategoryId
              | null;
            if (id) {
              setActiveCategory(id);
            }
          }
        }
      },
      {
        rootMargin: '-72px 0px -68% 0px',
        threshold: 0,
      }
    );

    for (const category of CATEGORIES) {
      const el = sectionRefs.current[category.id];
      if (el) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  const handleSelectCategory = useCallback((categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    const el = sectionRefs.current[categoryId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleAddItem = useCallback((item: MenuItem, variantId?: string) => {
    const effective = getEffectiveVariant(item, variantId);
    const key = buildCartKey(item.id, effective.variantId);

    setCart((prev) => {
      const existing = prev[key];
      if (existing) {
        return {
          ...prev,
          [key]: { ...existing, quantity: existing.quantity + 1 },
        };
      }
      return {
        ...prev,
        [key]: {
          key,
          itemId: item.id,
          name: item.name,
          variantId: effective.variantId,
          variantLabel: effective.variantLabel,
          unitPrice: effective.unitPrice,
          quantity: 1,
        },
      };
    });
  }, []);

  const handleIncrementKey = useCallback((cartKey: string) => {
    setCart((prev) => {
      const existing = prev[cartKey];
      if (!existing) return prev;
      return {
        ...prev,
        [cartKey]: { ...existing, quantity: existing.quantity + 1 },
      };
    });
  }, []);

  const handleDecrementKey = useCallback((cartKey: string) => {
    setCart((prev) => {
      const existing = prev[cartKey];
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        const next = { ...prev };
        delete next[cartKey];
        return next;
      }
      return {
        ...prev,
        [cartKey]: { ...existing, quantity: existing.quantity - 1 },
      };
    });
  }, []);

  const handleQuickAddUpsell = useCallback(
    (menuItemId: string, variantId?: string) => {
      const item = MENU_ITEMS.find((m) => m.id === menuItemId);
      if (item) {
        handleAddItem(item, variantId);
      }
    },
    [handleAddItem]
  );

  const handleClearCart = useCallback(() => {
    setCart({});
  }, []);

  const getQuantity = useCallback(
    (cartKey: string) => cart[cartKey]?.quantity ?? 0,
    [cart]
  );

  const cartEntries = useMemo(() => Object.values(cart), [cart]);
  const { totalCount, subtotal } = useMemo(
    () => calculateCartTotals(cartEntries),
    [cartEntries]
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className={`min-h-screen bg-[#FDFBF7] text-[#1A1412] ${totalCount > 0 ? 'pb-24' : ''}`}>
        <Header onOpenPhoneSheet={() => setIsPhoneSheetOpen(true)} />

        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        <main className="mx-auto max-w-2xl px-4 pt-4">
          {CATEGORIES.map((category) => {
            const items = MENU_ITEMS.filter(
              (item) => item.categoryId === category.id
            );

            return (
              <section
                key={category.id}
                id={`section-${category.id}`}
                data-category-id={category.id}
                ref={(el) => {
                  sectionRefs.current[category.id] = el;
                }}
                className="scroll-mt-[56px] py-5"
              >
                <div className="border-b-2 border-[#1A1412] pb-2 mb-1">
                  <h2 className="font-display text-lg font-extrabold text-[#1A1412]">
                    {category.title}
                  </h2>
                  <p className="text-xs text-[#5A4E49]">{category.subtitle}</p>
                </div>

                <div>
                  {items.map((item) => (
                    <MenuItemRow
                      key={item.id}
                      item={item}
                      getQuantity={getQuantity}
                      onAdd={handleAddItem}
                      onDecrement={handleDecrementKey}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </main>

        <Footer onOpenPhoneSheet={() => setIsPhoneSheetOpen(true)} />

        <FloatingCartBar
          totalCount={totalCount}
          subtotal={subtotal}
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />

        <CheckoutSheet
          isOpen={isCheckoutOpen}
          entries={cartEntries}
          onClose={() => setIsCheckoutOpen(false)}
          onIncrementKey={handleIncrementKey}
          onDecrementKey={handleDecrementKey}
          onQuickAddUpsell={handleQuickAddUpsell}
          onClearCart={handleClearCart}
        />

        <PhoneSheet
          isOpen={isPhoneSheetOpen}
          onClose={() => setIsPhoneSheetOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}

export default App;

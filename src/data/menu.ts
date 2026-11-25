export type CategoryId =
  | 'koshary'
  | 'tajins'
  | 'bakery'
  | 'addons'
  | 'desserts_drinks';

export interface CategoryMeta {
  id: CategoryId;
  title: string;
  subtitle: string;
}

export interface MenuVariant {
  id: string;
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  categoryId: CategoryId;
  name: string;
  description?: string;
  price: number;
  tag?: string;
  variantKind?: 'mozzarella' | 'size' | 'protein';
  variants?: readonly MenuVariant[];
}

export interface UpsellSuggestion {
  id: string;
  menuItemId: string;
  variantId?: string;
  label: string;
  price: number;
}

export const CATEGORIES: readonly CategoryMeta[] = [
  {
    id: 'koshary',
    title: 'الكشري',
    subtitle: 'أحجام متدرجة من السوبر ستار حتى الأكيل الكبير',
  },
  {
    id: 'tajins',
    title: 'الطواجن',
    subtitle: 'طواجن مكرونة بالفرن مع خيار إضافة الموتزاريلا الفوري',
  },
  {
    id: 'bakery',
    title: 'الحواوشي والبيتزا',
    subtitle: 'حواوشي لحمة وبيتزا إسكندراني بثلاثة أحجام',
  },
  {
    id: 'addons',
    title: 'الإضافات',
    subtitle: 'مقبلات الكشري المقرمشة وإضافات اللحوم',
  },
  {
    id: 'desserts_drinks',
    title: 'الحلويات والمشروبات',
    subtitle: 'أرز باللبن طازج ومشروبات باردة',
  },
];

export const MENU_ITEMS: readonly MenuItem[] = [
  // 1. الكشري (8 items — ordered as a clear size ladder)
  {
    id: 'koshary-super-star',
    categoryId: 'koshary',
    name: 'سوبر ستار',
    description: 'علبة كشري اقتصادية متكاملة مع الصلصة والدقة',
    price: 20,
  },
  {
    id: 'koshary-mega-star',
    categoryId: 'koshary',
    name: 'ميجا ستار',
    description: 'حجم فردي مناسب لوجبة سريعة مشبعة',
    price: 25,
  },
  {
    id: 'koshary-new-star',
    categoryId: 'koshary',
    name: 'نيو ستار',
    description: 'الحجم الأوسط المتوازن من المكرونة والأرز والعدس والتقلية',
    price: 30,
  },
  {
    id: 'koshary-five-star',
    categoryId: 'koshary',
    name: 'فايف ستار',
    description: 'الحجم المفضل لدى عملاء الحوامدية مع تقلية وحمص إضافي',
    price: 40,
    tag: 'الأكثر طلباً',
  },
  {
    id: 'koshary-big-star',
    categoryId: 'koshary',
    name: 'بيج ستار',
    description: 'حجم كبير مشبع لأصحاب الشهية القوية',
    price: 50,
  },
  {
    id: 'koshary-fatta',
    categoryId: 'koshary',
    name: 'فتة كشري',
    description: 'طبقات كشري بالعيش المحمص المقرمش والصلصة المخصوصة',
    price: 50,
  },
  {
    id: 'koshary-meal',
    categoryId: 'koshary',
    name: 'وجبة كشري',
    description: 'وجبة كشري متكاملة بتوليفة الأكيل الخاصة',
    price: 50,
  },
  {
    id: 'koshary-elakel-large',
    categoryId: 'koshary',
    name: 'الأكيل الكبير',
    description: 'أكبر علبة كشري عائلية في المنيو',
    // Note: Confirm 40 vs 50 EGP with management (50 EGP in printed menu, 40 EGP on elmenus)
    price: 50,
  },

  // 2. الطواجن (4 items — inline mozzarella toggle: عادي vs + موتزاريلا +25 ج.م)
  {
    id: 'tajin-plain',
    categoryId: 'tajins',
    name: 'طاجن سادة',
    description: 'مكرونة فرن بصلصة الطماطم المتبلة',
    price: 35,
    variantKind: 'mozzarella',
    variants: [
      { id: 'regular', label: 'عادي', price: 35 },
      { id: 'mozzarella', label: '+ موتزاريلا', price: 60 },
    ],
  },
  {
    id: 'tajin-meat',
    categoryId: 'tajins',
    name: 'طاجن لحمة',
    description: 'مكرونة فرن باللحمة المفرومة المتبلة',
    price: 40,
    variantKind: 'mozzarella',
    variants: [
      { id: 'regular', label: 'عادي', price: 40 },
      { id: 'mozzarella', label: '+ موتزاريلا', price: 65 },
    ],
  },
  {
    id: 'tajin-liver',
    categoryId: 'tajins',
    name: 'طاجن كبدة',
    description: 'مكرونة فرن بالكبدة الإسكندراني',
    price: 40,
    variantKind: 'mozzarella',
    variants: [
      { id: 'regular', label: 'عادي', price: 40 },
      { id: 'mozzarella', label: '+ موتزاريلا', price: 65 },
    ],
  },
  {
    id: 'tajin-chicken',
    categoryId: 'tajins',
    name: 'طاجن فراخ',
    description: 'مكرونة فرن بقطع الفراخ المتبلة',
    price: 45,
    variantKind: 'mozzarella',
    variants: [
      { id: 'regular', label: 'عادي', price: 45 },
      { id: 'mozzarella', label: '+ موتزاريلا', price: 70 },
    ],
  },

  // 3. الحواوشي والبيتزا الإسكندراني (2 multi-size items)
  {
    id: 'hawawshi-meat',
    categoryId: 'bakery',
    name: 'حواوشي لحمة',
    description: 'رغيف حواوشي بلدي بالخلطة الساخنة',
    price: 40,
    variantKind: 'size',
    variants: [
      { id: 'small', label: 'صغير', price: 40 },
      { id: 'medium', label: 'وسط', price: 50 },
      { id: 'large', label: 'كبير', price: 65 },
    ],
  },
  {
    id: 'pizza-alex-meat',
    categoryId: 'bakery',
    name: 'بيتزا لحمة إسكندراني',
    description: 'فطير إسكندراني محشو لحمة مفرومة وجبنة وخضروات',
    price: 90,
    variantKind: 'size',
    variants: [
      { id: 'small', label: 'صغير', price: 90 },
      { id: 'medium', label: 'وسط', price: 105 },
      { id: 'large', label: 'كبير', price: 120 },
    ],
  },

  // 4. الإضافات (5 items)
  {
    id: 'addon-lentils-onions',
    categoryId: 'addons',
    name: 'عدس أو تقلية',
    description: 'إضافة بصل مقرمش ذهبي أو عدس بجبة',
    price: 8,
  },
  {
    id: 'addon-sauce-chickpeas',
    categoryId: 'addons',
    name: 'صلصة أو حمص',
    description: 'علبة صلصة طماطم إضافية أو حمص شام',
    price: 8,
  },
  {
    id: 'addon-salad-pickles',
    categoryId: 'addons',
    name: 'سلطة أو مخلل',
    description: 'سلطة طماطم متبلة أو مخلل مشكل',
    price: 8,
  },
  {
    id: 'addon-toast',
    categoryId: 'addons',
    name: 'عيش توست مقرمش',
    description: 'خبز محمص مقرمش بالكمون والثوم',
    price: 8,
  },
  {
    id: 'addon-protein',
    categoryId: 'addons',
    name: 'إضافة لحوم',
    description: 'طبق إضافي لتعزيز الكشري أو الطاجن',
    price: 20,
    variantKind: 'protein',
    variants: [
      { id: 'liver', label: 'كبدة', price: 20 },
      { id: 'meat', label: 'لحمة', price: 20 },
      { id: 'chicken', label: 'فراخ', price: 20 },
    ],
  },

  // 5. الحلويات والمشروبات (4 items)
  {
    id: 'dessert-rice-plain',
    categoryId: 'desserts_drinks',
    name: 'أرز باللبن سادة',
    description: 'أرز باللبن كريمي بارد',
    price: 15,
  },
  {
    id: 'dessert-rice-oven',
    categoryId: 'desserts_drinks',
    name: 'أرز باللبن فرن',
    description: 'أرز باللبن مخبوز في الطاجن بوش محمر',
    price: 20,
  },
  {
    id: 'drink-sarookh',
    categoryId: 'desserts_drinks',
    name: 'صاروخ ساقع',
    description: 'مشروب غازي بارد حجم كبير',
    price: 20,
  },
  {
    id: 'drink-water',
    categoryId: 'desserts_drinks',
    name: 'مياه معدنية',
    description: 'زجاجة مياه معدنية باردة',
    price: 10,
  },
];

export const UPSELL_SUGGESTIONS: readonly UpsellSuggestion[] = [
  {
    id: 'upsell-toast',
    menuItemId: 'addon-toast',
    label: 'عيش توست',
    price: 8,
  },
  {
    id: 'upsell-onions',
    menuItemId: 'addon-lentils-onions',
    label: 'تقلية زيادة',
    price: 8,
  },
  {
    id: 'upsell-rice-oven',
    menuItemId: 'dessert-rice-oven',
    label: 'أرز باللبن فرن',
    price: 20,
  },
];

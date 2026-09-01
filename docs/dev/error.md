## Error Type
Runtime TypeError

## Error Message
Cannot read properties of undefined (reading 'toLowerCase')


    at <unknown> (app/dashboard/creator/products/page.tsx:78:32)
    at Array.filter (<anonymous>:null:null)
    at CreatorProductsPage (app/dashboard/creator/products/page.tsx:77:37)

## Code Frame
  76 |
  77 |   const filteredProducts = products.filter((p) => {
> 78 |     const matchQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase());
     |                                ^
  79 |     const matchCategory =
  80 |       selectedCategory === "ALL" || p.category === selectedCategory;
  81 |     return matchQuery && matchCategory;

Next.js version: 16.3.3 (Turbopack)


GET /dashboard/creator/profile 200 in 921ms (next.js: 92ms, proxy.ts: 486ms, application-code: 344ms)
 GET /api/creator-profile 200 in 2.5s (next.js: 12ms, proxy.ts: 213ms, application-code: 2.3s)
[browser] You have Reduced Motion enabled on your device. Animations may not appear as expected.. For more information and steps for solving, visit https://motion.dev/troubleshooting/reduced-motion-disabled (components/shadcn-studio/sidebar/sidebar-creator.tsx:68:46)
 GET /dashboard/creator/products 200 in 799ms (next.js: 219ms, proxy.ts: 487ms, application-code: 92ms)
 GET /api/products 200 in 3.3s (next.js: 420ms, proxy.ts: 222ms, application-code: 2.7s)
[browser] Uncaught TypeError: Cannot read properties of undefined (reading 'toLowerCase')
    at <unknown> (app/dashboard/creator/products/page.tsx:78:32)
    at Array.filter (<anonymous>)
    at CreatorProductsPage (app/dashboard/creator/products/page.tsx:77:37)
  76 |
  77 |   const filteredProducts = products.filter((p) => {
> 78 |     const matchQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase());
     |                                ^
  79 |     const matchCategory =
  80 |       selectedCategory === "ALL" || p.category === selectedCategory;
  81 |     return matchQuery && matchCategory;
 GET /api/products 200 in 2.3s (next.js: 9ms, proxy.ts: 182ms, application-code: 2.1s)
 GET /dashboard/creator/products 200 in 1007ms (next.js: 70ms, proxy.ts: 468ms, application-code: 468ms)
[browser] You have Reduced Motion enabled on your device. Animations may not appear as expected.. For more information and steps for solving, visit https://motion.dev/troubleshooting/reduced-motion-disabled (components/shadcn-studio/sidebar/sidebar-creator.tsx:68:46)
 GET /api/creator-profile 200 in 2.8s (next.js: 39ms, proxy.ts: 252ms, application-code: 2.5s)
 GET /api/products 200 in 4.9s (next.js: 36ms, proxy.ts: 589ms, application-code: 4.3s)
[browser] Uncaught TypeError: Cannot read properties of undefined (reading 'toLowerCase')
    at <unknown> (app/dashboard/creator/products/page.tsx:78:32)
    at Array.filter (<anonymous>)
    at CreatorProductsPage (app/dashboard/creator/products/page.tsx:77:37)
  76 |
  77 |   const filteredProducts = products.filter((p) => {
> 78 |     const matchQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase());
     |                                ^
  79 |     const matchCategory =
  80 |       selectedCategory === "ALL" || p.category === selectedCategory;
  81 |     return matchQuery && matchCategory;
 GET /api/products 200 in 2.9s (next.js: 42ms, proxy.ts: 637ms, application-code: 2.2s)

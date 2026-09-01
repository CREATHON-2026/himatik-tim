
▲ Next.js 16.3.3 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.1.142:3000
- Environments: .env.local, .env
✓ Ready in 9.5s
✓ Running next.config.ts took 400ms

⨯ Error: No QueryClient set, use QueryClientProvider to set one
    at KatalogPage (app\katalog\page.tsx:51:61)
  49 |
  50 |   // Fetch public products from real database
> 51 |   const { data: products = [], isLoading, error } = useQuery({
     |                                                             ^
  52 |     queryKey: ["public-products", selectedCategory, selectedSort],
  53 |     queryFn: () =>
  54 |       getPublicProducts({ {
  digest: '3403207532'
}
 GET /katalog 500 in 6.7s (next.js: 794ms, proxy.ts: 3.7s, application-code: 2.2s)
 GET / 200 in 1101ms (next.js: 233ms, proxy.ts: 274ms, application-code: 594ms)
[browser] Uncaught Error: No QueryClient set, use QueryClientProvider to set one
    at KatalogPage (app/katalog/page.tsx:51:61)
  49 |
  50 |   // Fetch public products from real database
> 51 |   const { data: products = [], isLoading, error } = useQuery({
     |                                                             ^
  52 |     queryKey: ["public-products", selectedCategory, selectedSort],
  53 |     queryFn: () =>
  54 |       getPublicProducts({


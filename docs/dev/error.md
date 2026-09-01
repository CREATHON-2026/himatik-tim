## Error Type
Console Error

## Error Message
React has detected a change in the order of Hooks called by OrderDetailPage. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
1. useContext                 useContext
2. useState                   useState
3. useState                   useState
4. useContext                 useContext
5. useContext                 useContext
6. useContext                 useContext
7. useEffect                  useEffect
8. useState                   useState
9. useCallback                useCallback
10. useSyncExternalStore      useSyncExternalStore
11. useEffect                 useEffect
12. useContext                useContext
13. useState                  useState
14. useEffect                 useEffect
15. useCallback               useCallback
16. useSyncExternalStore      useSyncExternalStore
17. useCallback               useCallback
18. undefined                 useState
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



    at OrderDetailPage (app/orders/[id]/page.tsx:133:51)

## Code Frame
  131 |
  132 |   // Hydrate local client data if available from recent checkout session
> 133 |   const [localMeta, setLocalMeta] = React.useState<{
      |                                                   ^
  134 |     buyerName?: string;
  135 |     buyerPhone?: string;
  136 |     shippingAddress?: string;

Next.js version: 16.3.3 (Turbopack)

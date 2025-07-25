# Changelog

#### [](https://github.com/barelief/CRM-Dash/compare/0.8.6...HEAD) 17 June 2025

#### [0.8.6](https://github.com/barelief/CRM-Dash/compare/0.8.5...0.8.6) 17 June 2025

- feat(admin/users): enhance UsersTable component (added menu) [`ca1ac31`](https://github.com/barelief/CRM-Dash/commit/ca1ac31a69412f0c22578e23bb224d12f52a8bf8)
- update TODO [`99232b6`](https://github.com/barelief/CRM-Dash/commit/99232b6ea9bebd37c0070059f3b366319076f4ea)
- fix(user-management): adjust layout of search bar and update confirmation dialog text for user activation [`ee74ee9`](https://github.com/barelief/CRM-Dash/commit/ee74ee95cdddb2e6b3cd9fbfbdf57e3471f5ab73)
- feat(users-table): add user activation functionality with confirmation dialog [`086723d`](https://github.com/barelief/CRM-Dash/commit/086723d1c49058c7feba490d539d6e5236a3ebe1)
- feat(user-management): refactor user management page to utilize UsersTable component and enhance search functionality [`2ae0c40`](https://github.com/barelief/CRM-Dash/commit/2ae0c40896393d301967ac0244f248a32a194284)

#### [0.8.5](https://github.com/barelief/CRM-Dash/compare/v0.8.4...0.8.5) 16 June 2025

- - ✅ Invoices v0.8.2 [`#21`](https://github.com/barelief/CRM-Dash/pull/21)
- refactor(admin-layout): simplify authentication logic using user profile query and remove unused state management [`ba43a83`](https://github.com/barelief/CRM-Dash/commit/ba43a8319843a642664d84477b2a6cfb374074a8)
- feat(next.config): add compiler configuration to remove console logs in production [`5da9a71`](https://github.com/barelief/CRM-Dash/commit/5da9a71e9e5033362123bc24aa5bcfddaa90c010)
- feat(pickup-orders): enhance CreatePickupOrderDialog with date and time pickers, improved validation, and loading state for couriers [`9c1b078`](https://github.com/barelief/CRM-Dash/commit/9c1b0786fc7c7fad0ef7759bfa829b242c1e9d45)
- feat(pickup-orders): implement pagination for pickup orders with navigation controls [`2bfbfe5`](https://github.com/barelief/CRM-Dash/commit/2bfbfe5943b75262a7eceacbdb004ae8be80bac0)
- feat(pickup-orders): add CreatePickupOrderDialog component for creating new pickup orders [`eec50dd`](https://github.com/barelief/CRM-Dash/commit/eec50dd52f7f948750be1078aa4ab4587ad7ac57)
- feat(pickup-orders): implement confirmation dialog for canceling pickup orders [`24d28ed`](https://github.com/barelief/CRM-Dash/commit/24d28edfede77007ceb0e14922c273354efdefd3)
- feat(api): update pickup orders API to include detailed order retrieval and pagination support [`2315f47`](https://github.com/barelief/CRM-Dash/commit/2315f47a77e683b011359ac58ec5dd7acefde68c)
- feat(pickup-orders): add cancel functionality for pickup orders with success and error notifications [`2bb3d78`](https://github.com/barelief/CRM-Dash/commit/2bb3d78a5476e0b2f5a88cca3bc71633ae7f09c6)
- feat(carriage): add Orders and PickupOrders components with data fetching and UI for order management [`7e6b342`](https://github.com/barelief/CRM-Dash/commit/7e6b342981daff222a4a5a14f8ad3dc10cb41cff)
- feat(api): add new API endpoints for fetching and managing courier orders, including pagination and order details [`a7cd294`](https://github.com/barelief/CRM-Dash/commit/a7cd294692abee80f4dde8c8530baf86e7553928)
- refactor(users): update UserRow component to use UserProfile type and improve user name handling [`33584be`](https://github.com/barelief/CRM-Dash/commit/33584be23a00c62a6c1a20151f4b32d6faf892ee)
- fix: fix ts errors related to deprecated mockup functions [`234a931`](https://github.com/barelief/CRM-Dash/commit/234a9312615f593af82c89e213971e7f2362d5b3)
- fix(orders): update status color mapping to use lowercase and streamline order statuses [`30b671d`](https://github.com/barelief/CRM-Dash/commit/30b671d819bef7c98a23e697d45bd320e0b4e930)
- fix: update order details view to use shipment_barcode instead of shipment_id [`b08ccac`](https://github.com/barelief/CRM-Dash/commit/b08ccac8fe34713669f914c46a33652c9d882aca)
- feat(login): replace img with next/image for logo optimization [`2c0d30c`](https://github.com/barelief/CRM-Dash/commit/2c0d30cc5dc46c64fddc1cd629a8c9f5df3896e5)
- fix(orders): update shipment tracking identifier from shipment_id to shipment_barcode [`ae2ff6c`](https://github.com/barelief/CRM-Dash/commit/ae2ff6c9f3cba70bc67275f4893bb31edfa9086c)
- refactor(orders/filters): update order statuses to use lowercase and simplify list [`f9a0cdf`](https://github.com/barelief/CRM-Dash/commit/f9a0cdf7a7682d30c18c0692046b052f0b2df63c)
- refactor(admin/layout): remove unused API_ENDPOINTS import [`9df866b`](https://github.com/barelief/CRM-Dash/commit/9df866bfde9c0e4c4974d8d0b4537983f2132200)
- feat: add temporary useUsers hook with mock data [`6595798`](https://github.com/barelief/CRM-Dash/commit/6595798c3155f5bd5b34eb1bf2161d943fa30f7e)
- feat(orders/carriage): add columns for carriage and orders data tables [`3e653c2`](https://github.com/barelief/CRM-Dash/commit/3e653c2d853e094f83b7268ad2f1e771368b764d)
- feat(carriage): integrate orders data fetching and enhance order list display [`8fb1834`](https://github.com/barelief/CRM-Dash/commit/8fb183475283b4ca1dc018fc5deb7b1985c46efd)
- feat(login): add logo to login page for improved branding [`589c59e`](https://github.com/barelief/CRM-Dash/commit/589c59eccc2c2425f82cd35f92ad421008ca2428)

#### [v0.8.4](https://github.com/barelief/CRM-Dash/compare/v0.8.3...v0.8.4) 13 June 2025

- feat(price-management): implement search functionality in discount management [`68c0928`](https://github.com/barelief/CRM-Dash/commit/68c0928fcd0a90e9e99e1870555f470f10b0203a)
- feat(discount-management): enhance discount table and list components [`f5eb57c`](https://github.com/barelief/CRM-Dash/commit/f5eb57c05c860871add6da70b2126aed62df0828)
- refactor(discount-management): remove checkbox column from discount table [`d4d3b1d`](https://github.com/barelief/CRM-Dash/commit/d4d3b1d12513ce6a42861198b61e16106d063b9a)
- update TODO [`a2fdf34`](https://github.com/barelief/CRM-Dash/commit/a2fdf343af8abfb2968bf955bbb90c5b64fb6b8d)
- update(TODO): refine tasks for price adjustments [`553877b`](https://github.com/barelief/CRM-Dash/commit/553877b5310d2dc7a1a9921addf5a14cee9de8f5)
- refactor(price-management): update terminology in DiscountsPage and DiscountForm [`4961707`](https://github.com/barelief/CRM-Dash/commit/496170755b259071d495d864e7dbc0f85edf7591)
- feat(discount-management): enhance discount form [`3f0316b`](https://github.com/barelief/CRM-Dash/commit/3f0316b3c6c72ff83baab9c30fdee8010820935d)
- feat(discount-management): update discount form and validation for improved user experience [`c5ee9d0`](https://github.com/barelief/CRM-Dash/commit/c5ee9d0229c23c943b104783005ec0a3dc75481c)
- refactor(api/proxy): comment out debug logging in proxy request and response handling [`e5c2599`](https://github.com/barelief/CRM-Dash/commit/e5c259980e90023b6df03060597402fc839909d6)
- feat(discount-management): add delete functionality to discount management components [`4033562`](https://github.com/barelief/CRM-Dash/commit/4033562bfb62130cf48661b2c4ab2ebf9422e88c)
- feat(api-client): enhance proxy request handling and response parsing [`a08082c`](https://github.com/barelief/CRM-Dash/commit/a08082c0656878b6240f088b2b7f7e9a7ad2b123)
- feat(discount-management): implement refresh logic for discount list and form submission [`9f3e5db`](https://github.com/barelief/CRM-Dash/commit/9f3e5dbe589e161038540558a263cf98b8dd56b2)
- upated TODO [`d3fb342`](https://github.com/barelief/CRM-Dash/commit/d3fb342c1ef0c0dd7261253088770ffd45ce4c3f)
- feat(discount-management): enhance discount form with validation and new fields [`ca12f83`](https://github.com/barelief/CRM-Dash/commit/ca12f8396fbc894e5f8a82418815c70b1b6543f1)
- feat(discount-management): refactor discount components for price adjustments [`76c6161`](https://github.com/barelief/CRM-Dash/commit/76c6161d80e8217663b15b3d36bf3d7cfae49a36)
- feat(discount-management): refactor discount form for price adjustments [`85684ba`](https://github.com/barelief/CRM-Dash/commit/85684ba4162da14d9ae008ee47fac1df350e967b)
- feat(discount-management): enhance discount form with category selection [`850d7f7`](https://github.com/barelief/CRM-Dash/commit/850d7f7fff80b34985ecf9214b3478fee5a8cddc)
- refactor(discount-management): update column headers and data access for price range [`b766c0f`](https://github.com/barelief/CRM-Dash/commit/b766c0f32021718e0a54bf4e3e05bf2376118264)
- refactor(price-management): update terminology from "Price Management" to "Price rules" for consistency [`6b8cb28`](https://github.com/barelief/CRM-Dash/commit/6b8cb287b90c8ae943ac310adfe3dfb485e004ba)
- docs(api-client): add note on using data types from index.ts [`7b78bdb`](https://github.com/barelief/CRM-Dash/commit/7b78bdb045d5a4c5aac50db5220ae4e1566031ff)
- feat(api): add price range and validity date fields to API schema [`3eb81fa`](https://github.com/barelief/CRM-Dash/commit/3eb81facc695aaf4750120b53d3ec99d9926f771)
- feat(carriage): add courier management endpoints and update API client [`9d8b29c`](https://github.com/barelief/CRM-Dash/commit/9d8b29c826477748e3f4de74a0255eba0f849f42)
- feat(auth): enhance user login and navigation with essential user data management [`7db74ab`](https://github.com/barelief/CRM-Dash/commit/7db74ab37d2d3f463042b4732d20dd0cff112f83)
- chore(deps): update @tanstack/react-query to version 5.80.6 in package.json and package-lock.json [`1d5c84e`](https://github.com/barelief/CRM-Dash/commit/1d5c84e27dadd570c10f201b96e32eff1839a5dd)

#### [v0.8.3](https://github.com/barelief/CRM-Dash/compare/v0.8.1...v0.8.3) 9 June 2025

- feat(balance): enhance balance dashboard with new summary and carousel components [`a6e2ea4`](https://github.com/barelief/CRM-Dash/commit/a6e2ea49b7b856471a61f0d1e8b1e48c235295fa)
- update todo [`bb57ff5`](https://github.com/barelief/CRM-Dash/commit/bb57ff5bd0dd439ee42ced381c308df6e978e0a9)
- feat(orders): enhance order management with improved data fetching and error handling [`908992b`](https://github.com/barelief/CRM-Dash/commit/908992b42e1ffd57878833414df558fab31be89c)
- eat(invoices): enhance invoice pages with improved data fetching and loading states [`a5fabb1`](https://github.com/barelief/CRM-Dash/commit/a5fabb1228bc804fabe37997fe98c737cd7b50d0)
- feat(products): add product detail view functionality in ProductTable [`be3f6a4`](https://github.com/barelief/CRM-Dash/commit/be3f6a4fd5189316b24b8a695f3589529f1f41ba)
- refactor(categories): streamline product fetching in CategorySection component [`3a710ec`](https://github.com/barelief/CRM-Dash/commit/3a710ec3414134a70faa61c46d5f7c640804a321)
- fix(product-table): update filter input to use correct column accessor [`b068881`](https://github.com/barelief/CRM-Dash/commit/b0688818c260ba8e4d91ba9452905933ccf0ff70)
- refactor(products): optimize product fetching and enhance error handling [`8c45cc1`](https://github.com/barelief/CRM-Dash/commit/8c45cc1c03da086b94beda53080a93f992827aca)
- refactor(api): streamline API client to use proxy request by defualt [`b9dc2f3`](https://github.com/barelief/CRM-Dash/commit/b9dc2f3da262456dfa0da71fa61411e14387511b)
- feat(auth): enhance login and logout functionality with token management [`ef58717`](https://github.com/barelief/CRM-Dash/commit/ef58717c8a1e4cf564d4d9438a224d1f27ca0a7a)
- feat(api): implement new API client [`602a89f`](https://github.com/barelief/CRM-Dash/commit/602a89f16ebf283c746920bcff88b42bd0c7fbe5)
- refactor(invoices): update invoice data types and enhance fetching logic [`bbcdf3b`](https://github.com/barelief/CRM-Dash/commit/bbcdf3b476593d50949d97606a17085048326d1a)
- refactor(invoices): simplify invoice page and enhance data handling [`c23441f`](https://github.com/barelief/CRM-Dash/commit/c23441f981ff34171cdac2ed9a5fb91e76e4a245)
- feat(invoices): integrate API data with invoice table [`46ebd16`](https://github.com/barelief/CRM-Dash/commit/46ebd1696c5f85ca682b0407304db40cd3271986)

#### [v0.8.1](https://github.com/barelief/CRM-Dash/compare/v0.8.0...v0.8.1) 20 May 2025

- feat: implement product catalogs API integration [`4e16c9b`](https://github.com/barelief/CRM-Dash/commit/4e16c9b66f18724248a15a92f35c3345abef982d)
- feat(api): implement product category grouping from products endpoint [`335978e`](https://github.com/barelief/CRM-Dash/commit/335978ef291f7c66426806928850769a989f1f0e)
- refactor: update product types and properties in ProductList and ViewProduct components [`7a2c724`](https://github.com/barelief/CRM-Dash/commit/7a2c7244eebf6cce1f0a82ab0a76f8ec59f32aad)

#### [v0.8.0](https://github.com/barelief/CRM-Dash/compare/v0.7.0...v0.8.0) 18 May 2025

- feat: implement api calls to /api/products [`5df3b29`](https://github.com/barelief/CRM-Dash/commit/5df3b29b50ea719241db1f37c1955e2f06a56898)

#### [v0.7.0](https://github.com/barelief/CRM-Dash/compare/v0.6.0...v0.7.0) 15 May 2025

- Feature/openapi impl [`#4`](https://github.com/barelief/CRM-Dash/pull/4)
- **Breaking change:** feat(openapi): Implement comprehensive API integration and UI enhancements [`f9d336d`](https://github.com/barelief/CRM-Dash/commit/f9d336d152e624280584b654528f9b83cd171486)
- feat: add Cursor rule for backend API calls [`b5d080e`](https://github.com/barelief/CRM-Dash/commit/b5d080e9cfb2f4ad0d5b198781acf3b988834ca7)
- fix: update dependencies in hooks to ensure type safety [`93bc396`](https://github.com/barelief/CRM-Dash/commit/93bc396b2d394735329cc7d6b70257942cc14e51)
- feat: add OpenAPI integration with type generation [`1e5d90e`](https://github.com/barelief/CRM-Dash/commit/1e5d90e9435b6f9d19bad5ba7026a9ea55ba7233)
- chore(profile): add comments to profile code [`f004675`](https://github.com/barelief/CRM-Dash/commit/f004675bd0978a495ec93cf27ba1f09090bbb913)
- fix: add explicit fetch options for profile update [`99c54e0`](https://github.com/barelief/CRM-Dash/commit/99c54e0652252a6c72752dfcf36226210651c319)
- fix: add /api prefix to profile endpoints [`e5ee5ef`](https://github.com/barelief/CRM-Dash/commit/e5ee5effcbf5e9d1c57c58220bc6d3f66ba271fa)
- feat(backend): implement GET request for /api/profile [`a8ae2bb`](https://github.com/barelief/CRM-Dash/commit/a8ae2bbce724c9f2f281a5d8dc7e4636fccb905e)

#### [v0.6.0](https://github.com/barelief/CRM-Dash/compare/v0.5.0...v0.6.0) 11 May 2025

- ✨ feat(auth): implement auth integration [`365d484`](https://github.com/barelief/CRM-Dash/commit/365d4843610f6fcc42db0e39ddae9b4693114627)

#### [v0.5.0](https://github.com/barelief/CRM-Dash/compare/v0.4.0...v0.5.0) 26 November 2024

- ✨ Add Admin Panel: Products Page [`a815f23`](https://github.com/barelief/CRM-Dash/commit/a815f23961292cae6a62676e4c15eec58a5e11b8)
- ✨ Add Admin Panel: Payment Page [`9448ac0`](https://github.com/barelief/CRM-Dash/commit/9448ac0f0f6af8670b2eddcee4164d43538f70c3)
- ✨ Add Admin Panel: User's Orders page [`d9240c5`](https://github.com/barelief/CRM-Dash/commit/d9240c508efd92400dcf58af2277b5051d338dbd)
- 📱 style: fix spacing issue above menu [`a1ece04`](https://github.com/barelief/CRM-Dash/commit/a1ece0407f9ee32b049693283bd484bea269808b)
- 🐛 fix sidebar no-scrolling bug [`bf00ce1`](https://github.com/barelief/CRM-Dash/commit/bf00ce11279c30436edda078a41b7889533315e7)
- ♻️ Extract balance mockup data to separate file [`ce11d6e`](https://github.com/barelief/CRM-Dash/commit/ce11d6e5dfefb60f221a726636773cc255679888)
- ✨ Add Admin Panel: Payout page [`e372042`](https://github.com/barelief/CRM-Dash/commit/e372042b4ef713011dd26137d9b40fdd16ee65ee)
- ✨ Add Supplier recommendation page [`ea93b46`](https://github.com/barelief/CRM-Dash/commit/ea93b46e93dea6311c6999b57e6b8b96ff4ec4af)
- ✨ Add Admin: User Management page [`ca074b1`](https://github.com/barelief/CRM-Dash/commit/ca074b1deae4f06c4d08273d7fa12700b820cb73)
- ✨ Add Carriage section [`f7c4a2f`](https://github.com/barelief/CRM-Dash/commit/f7c4a2f403f77e6d82057783d234f334a9077947)
- 📱 Styling: Ivoice card: add Trending Badge at the top [`de993c8`](https://github.com/barelief/CRM-Dash/commit/de993c850d3623510da48aa5f7170d8de521e59d)
- ♻️ refactor Kainodara to Price Management [`4238a23`](https://github.com/barelief/CRM-Dash/commit/4238a2373505c9d0b772303fd1447612af35a7dd)

#### [v0.4.0](https://github.com/barelief/CRM-Dash/compare/v0.3.0...v0.4.0) 3 November 2024

- feat: add invoices carousel [`d62fbd1`](https://github.com/barelief/CRM-Dash/commit/d62fbd1e6de2cf8260f35ca886621f832a8e4e88)
- ✨ Add Invoices section [`284ea43`](https://github.com/barelief/CRM-Dash/commit/284ea43edc3a63840f2d3e3cd18838087072c869)
- ✨ Add Discount Management section [`2cb70ab`](https://github.com/barelief/CRM-Dash/commit/2cb70ab42413e6008b17f53036dd9d458d94f782)
- ♻️ rename image name in public/ to opengraph-image-2.png [`8b5c8a7`](https://github.com/barelief/CRM-Dash/commit/8b5c8a752d47b502a7fca0c082133b1df7e0ea8f)
- ♻️ use ref image from public/ to display opengraph [`e2aaaac`](https://github.com/barelief/CRM-Dash/commit/e2aaaac384489cd413b241cf10e38c740602bb57)
- ♻️ use a versioned filename to diplay opengraph [`092884e`](https://github.com/barelief/CRM-Dash/commit/092884eedcd38f8c37a21f64f88b3b16224b29ad)
- ✨ Add Authentication Components [`185c743`](https://github.com/barelief/CRM-Dash/commit/185c743f0db6137f7273fbf4f014939bc29c075d)
- Update sandbox/page.tsx that prevented build [`49d67dd`](https://github.com/barelief/CRM-Dash/commit/49d67dd229d268cdf649a1e069d0c3400693c311)
- 📱 Styling: update icon colors in Balance Cards [`a427d2e`](https://github.com/barelief/CRM-Dash/commit/a427d2ef9b55f1994aba48f4f3aefa8c0b9cda67)
- ✨ Add Balance section [`4911906`](https://github.com/barelief/CRM-Dash/commit/49119063c5a2926713af9c9becacdad2e2df2249)
- 📱 Update styling in Orders section [`4801dec`](https://github.com/barelief/CRM-Dash/commit/4801decfcc4dff356f0704efca5f5fa4bb3e406c)
- 📱 Styling: update styling an responsive design [`fdb21e0`](https://github.com/barelief/CRM-Dash/commit/fdb21e0bea9872cf11a615234fc7e7f73604906f)
- ✨ Add `Orders` section [`fed8bde`](https://github.com/barelief/CRM-Dash/commit/fed8bde3d83ca1f9da84dfcd0ec91fdc6415b0bc)
- ♻️ added type definitions [`9020eeb`](https://github.com/barelief/CRM-Dash/commit/9020eebf16156233d443280665d5bd53e7764956)
- feat: added Orders Carousel [`ebc71dd`](https://github.com/barelief/CRM-Dash/commit/ebc71dd65032c679c7935e9a6f6e1d840eb780b5)

#### [v0.3.0](https://github.com/barelief/CRM-Dash/compare/v0.2.0...v0.3.0) 31 October 2024

- ✨ Add `Support` section [`1a46c7d`](https://github.com/barelief/CRM-Dash/commit/1a46c7ddef1a222ea6d0040fc40a6fdd7fb394bb)
- ✨ Add Category section [`5c2e40f`](https://github.com/barelief/CRM-Dash/commit/5c2e40fb4ddd89193f6fdd9cc7865787c29b301e)
- feat: added initial `Add Product` page [`cb9c5a5`](https://github.com/barelief/CRM-Dash/commit/cb9c5a5b611003043e6549cb4cd8cc95b8e88426)
- ♻️ format Popular Products block [`9f9e831`](https://github.com/barelief/CRM-Dash/commit/9f9e83166a6b3a57c919fa5d1c616ae201edba57)
- ♻️ refactor and clean up code [`55ce04c`](https://github.com/barelief/CRM-Dash/commit/55ce04cfc0e7e606a79aac3075a32fb7cb9f7b77)
- ♻️ extracted header markup to separate component [`67c481d`](https://github.com/barelief/CRM-Dash/commit/67c481dcb479ecbb3fc4ef09a0206724c2eb2b24)

#### [v0.2.0](https://github.com/barelief/CRM-Dash/compare/v0.1.0...v0.2.0) 26 October 2024

- ✨ added sorting functionality to header [`e6fcd07`](https://github.com/barelief/CRM-Dash/commit/e6fcd07cfc1bde0f4e692ab425ab75f4f082708f)
- ♻️ type error fix in carousel code [`adfa138`](https://github.com/barelief/CRM-Dash/commit/adfa1385e55dd3492bf1a8b0a632206b2e37eba6)
- ✨ added Carousel for Stats cards [`9d3927d`](https://github.com/barelief/CRM-Dash/commit/9d3927d43a3a41478317fa7f22ac8fb124021f02)
- ✨ added Products List section [`71de7d9`](https://github.com/barelief/CRM-Dash/commit/71de7d9882086edc8b21d10b65a2a4b94d981d4b)
- ✨ added CHANGELOG (md and inside app) [`4e8d398`](https://github.com/barelief/CRM-Dash/commit/4e8d39855f3c90e851c47d7ef57ee0f8084ffe63)
- ✨ added Settings section [`e20dfe2`](https://github.com/barelief/CRM-Dash/commit/e20dfe2e49c707b053fb97d2cae23cd9c2568fbf)
- ♻️ extract `&lt;Breadcrumbs /&gt;`  into separate component [`35c5a67`](https://github.com/barelief/CRM-Dash/commit/35c5a67c7d9431bff818b0b4146fda855f7558a3)
- ♻️ trying adding font to body in globals.css [`a4c2bed`](https://github.com/barelief/CRM-Dash/commit/a4c2bed3560a63c36f12bcdd0b3f8b60881a04a5)
- ♻️ trying importing fonts from google [`3f81561`](https://github.com/barelief/CRM-Dash/commit/3f81561dcd376ea37aeb092e0b9bbb8f530a4277)
- ♻️ refactored font imports [`ae2f8c0`](https://github.com/barelief/CRM-Dash/commit/ae2f8c05c38b204ee4b253288f0131b1cad604a7)
- 🍱 added Manrope ttf files files [`ec27ad2`](https://github.com/barelief/CRM-Dash/commit/ec27ad201380d9262a7248730de48645e7799e4b)
- ✨added Manrope as default font [`abeb551`](https://github.com/barelief/CRM-Dash/commit/abeb5515b029c783bb1a0cd58d7fd4489e106143)
- ✨ added proper logo in sidebar [`f5524b6`](https://github.com/barelief/CRM-Dash/commit/f5524b6cb28723f2f2a505efac5cbac5992d1f06)
- 🍱 added proper logo files [`ca1b03c`](https://github.com/barelief/CRM-Dash/commit/ca1b03c948ef42abc91bbb234fe35987015100b7)

#### v0.1.0 18 May 2025

- init [`03506da`](https://github.com/barelief/CRM-Dash/commit/03506dae5736a6a05733f220f1e41b723007570a)

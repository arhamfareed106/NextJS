// src/lib/api/hooks.ts
// Auto-generated - do not edit manually
import { useTypedQuery, useTypedMutation } from "./hooksBase";
import * as helpers from "./helpers";
import type { QueryConfig } from "./types";

/**
 * Get balance sheets
 * React Query hook for GET /api/admin/balances
 */
export const useGetAdminBalanceSheetsQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getAdminBalanceSheets", params],
    () => helpers.getAdminBalanceSheets(params),
    options
  );
};

/**
 * Get balance sheet by ID
 * React Query hook for GET /api/admin/balances/{id}
 */
export const useGetAdminBalanceSheetByIdQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getAdminBalanceSheetById", params],
    () => helpers.getAdminBalanceSheetById(params),
    options
  );
};

/**
 * Get invoices
 * React Query hook for GET /api/admin/invoices
 */
export const useGetAdminInvoicesQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getAdminInvoices", params],
    () => helpers.getAdminInvoices(params),
    options
  );
};

/**
 * Get invoice by ID
 * React Query hook for GET /api/admin/invoices/{id}
 */
export const useGetAdminInvoiceByIdQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getAdminInvoiceById", params],
    () => helpers.getAdminInvoiceById(params),
    options
  );
};

/**
 * Mark an invoice as paid
 * React Query mutation hook for POST /api/admin/invoices/{id}/pay
 */
export const usePayAdminInvoiceMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.payAdminInvoice(params),
    options
  );
};

/**
 * Get admin markups
 * React Query hook for GET /api/admin/markups
 */
export const useGetAdminMarkupsQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getAdminMarkups", params],
    () => helpers.getAdminMarkups(params),
    options
  );
};

/**
 * Create a new markup
 * React Query mutation hook for POST /api/admin/markups
 */
export const useCreateAdminMarkupMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.createAdminMarkup(params),
    options
  );
};

/**
 * Get markup by ID
 * React Query hook for GET /api/admin/markups/{id}
 */
export const useGetAdminMarkupByIdQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getAdminMarkupById", params],
    () => helpers.getAdminMarkupById(params),
    options
  );
};

/**
 * Update an existing markup
 * React Query mutation hook for PUT /api/admin/markups/{id}
 */
export const useUpdateAdminMarkupMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.updateAdminMarkup(params),
    options
  );
};

/**
 * Delete a markup
 * React Query mutation hook for DELETE /api/admin/markups/{id}
 */
export const useDeleteAdminMarkupMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.deleteAdminMarkup(params),
    options
  );
};

/**
 * Get admin orders
 * React Query hook for GET /api/admin/orders
 */
export const useGetAdminOrdersQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getAdminOrders", params],
    () => helpers.getAdminOrders(params),
    options
  );
};

/**
 * Get admin order by ID
 * React Query hook for GET /api/admin/orders/{id}
 */
export const useGetAdminOrderByIdQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getAdminOrderById", params],
    () => helpers.getAdminOrderById(params),
    options
  );
};

/**
 * Return products from an order
 * React Query mutation hook for POST /api/admin/orders/{id}/return
 */
export const useReturnAdminOrderProductsMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.returnAdminOrderProducts(params),
    options
  );
};

/**
 * Get admin products
 * React Query hook for GET /api/admin/products
 */
export const useGetAdminProductsQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getAdminProducts", params],
    () => helpers.getAdminProducts(params),
    options
  );
};

/**
 * Get admin product catalogs
 * React Query hook for GET /api/admin/product-catalogs
 */
export const useGetAdminProductCatalogsQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getAdminProductCatalogs", params],
    () => helpers.getAdminProductCatalogs(params),
    options
  );
};

/**
 * Get admin product by ID
 * React Query hook for GET /api/admin/products/{id}
 */
export const useGetAdminProductByIdQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getAdminProductById", params],
    () => helpers.getAdminProductById(params),
    options
  );
};

/**
 * Get admin users
 * React Query hook for GET /api/admin/users
 */
export const useGetAdminUsersQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getAdminUsers", params],
    () => helpers.getAdminUsers(params),
    options
  );
};

/**
 * Activate a user
 * React Query mutation hook for POST /api/admin/users/{id}/activate
 */
export const useActivateAdminUserMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.activateAdminUser(params),
    options
  );
};

/**
 * Adds user to admin group
 * React Query mutation hook for POST /api/admin/users/{id}/add-admin
 */
export const useAddAdminUserMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.addAdminUser(params),
    options
  );
};

/**
 * Register a new user
 * React Query mutation hook for POST /api/register
 */
export const useRegisterUserMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.registerUser(params),
    options
  );
};

/**
 * User Login
 * React Query mutation hook for POST /api/login
 */
export const useLoginUserMutation = (options: any = {}) => {
  return useTypedMutation((params?: any) => helpers.loginUser(params), options);
};

/**
 * User Logout
 * React Query mutation hook for POST /api/logout
 */
export const useLogoutUserMutation = (options: any = {}) => {
  return useTypedMutation(() => helpers.logoutUser(), options);
};

/**
 * Get User Profile
 * React Query hook for GET /api/profile
 */
export const useGetUserProfileQuery = (options: QueryConfig = {}) => {
  return useTypedQuery(
    ["api", "getUserProfile"],
    () => helpers.getUserProfile(),
    options
  );
};

/**
 * Update User Profile
 * React Query mutation hook for POST /api/profile
 */
export const useUpdateUserProfileMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.updateUserProfile(params),
    options
  );
};

/**
 * Forgot Password
 * React Query mutation hook for POST /api/forgot-password
 */
export const useForgotPasswordMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.forgotPassword(params),
    options
  );
};

/**
 * Reset Password
 * React Query mutation hook for POST /api/reset-password
 */
export const useResetPasswordMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.resetPassword(params),
    options
  );
};

/**
 * Get balance sheets
 * React Query hook for GET /api/balances
 */
export const useGetBalanceSheetsQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getBalanceSheets", params],
    () => helpers.getBalanceSheets(params),
    options
  );
};

/**
 * Get balance summary
 * React Query hook for GET /api/balances-summary
 */
export const useGetBalanceSummaryQuery = (options: QueryConfig = {}) => {
  return useTypedQuery(
    ["api", "getBalanceSummary"],
    () => helpers.getBalanceSummary(),
    options
  );
};

/**
 * Get balance sheet by ID
 * React Query hook for GET /api/balances/{id}
 */
export const useGetBalanceSheetByIdQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getBalanceSheetById", params],
    () => helpers.getBalanceSheetById(params),
    options
  );
};

/**
 * Get list of courier types
 * React Query hook for GET /api/carriage/couriers
 */
export const useGetCouriersQuery = (options: QueryConfig = {}) => {
  return useTypedQuery(
    ["api", "getCouriers"],
    () => helpers.getCouriers(),
    options
  );
};

/**
 * Get paginated list of courier orders for authenticated user
 * React Query hook for GET /api/carriage/pickup-orders
 */
export const useGetPickupOrdersQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getPickupOrders", params],
    () => helpers.getPickupOrders(params),
    options
  );
};

/**
 * Create a courier order
 * React Query mutation hook for POST /api/carriage/pickup-orders
 */
export const useCreatePickupOrderMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.createPickupOrder(params),
    options
  );
};

/**
 * Cancel a courier pickup
 * React Query mutation hook for POST /api/carriage/pickup-orders/{id}/cancel
 */
export const useCancelPickupOrderMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.cancelPickupOrder(params),
    options
  );
};

/**
 * Get courier order for user
 * React Query hook for GET /api/carriage/pickup-orders/{id}
 */
export const useGetPickupOrdersByIdQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getPickupOrdersById", params],
    () => helpers.getPickupOrdersById(params),
    options
  );
};

/**
 * Get invoices
 * React Query hook for GET /api/invoices
 */
export const useGetInvoicesQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getInvoices", params],
    () => helpers.getInvoices(params),
    options
  );
};

/**
 * Get invoice summary
 * React Query hook for GET /api/invoices-summary
 */
export const useGetInvoiceSummaryQuery = (options: QueryConfig = {}) => {
  return useTypedQuery(
    ["api", "getInvoiceSummary"],
    () => helpers.getInvoiceSummary(),
    options
  );
};

/**
 * Get invoice by ID
 * React Query hook for GET /api/invoices/{id}
 */
export const useGetInvoiceByIdQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getInvoiceById", params],
    () => helpers.getInvoiceById(params),
    options
  );
};

/**
 * Get orders with filters
 * React Query hook for GET /api/orders
 */
export const useGetOrdersQuery = (params?: any, options: QueryConfig = {}) => {
  return useTypedQuery(
    ["api", "getOrders", params],
    () => helpers.getOrders(params),
    options
  );
};

/**
 * Get order statistics
 * React Query hook for GET /api/orders/stats
 */
export const useGetOrderStatsQuery = (options: QueryConfig = {}) => {
  return useTypedQuery(
    ["api", "getOrderStats"],
    () => helpers.getOrderStats(),
    options
  );
};

/**
 * Get daily order statistics
 * React Query hook for GET /api/order/daily-stats
 */
export const useGetDailyOrderStatsQuery = (options: QueryConfig = {}) => {
  return useTypedQuery(
    ["api", "getDailyOrderStats"],
    () => helpers.getDailyOrderStats(),
    options
  );
};

/**
 * Get order count by status
 * React Query hook for GET /api/orders/count
 */
export const useGetOrderCountByStatusQuery = (options: QueryConfig = {}) => {
  return useTypedQuery(
    ["api", "getOrderCountByStatus"],
    () => helpers.getOrderCountByStatus(),
    options
  );
};

/**
 * Get order by ID
 * React Query hook for GET /api/orders/{id}
 */
export const useGetOrderByIdQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getOrderById", params],
    () => helpers.getOrderById(params),
    options
  );
};

/**
 * Confirm an order
 * React Query mutation hook for POST /api/orders/{id}/confirm
 */
export const useConfirmOrderMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.confirmOrder(params),
    options
  );
};

/**
 * Get address card for order
 * React Query hook for GET /api/orders/{id}/address-card
 */
export const usePrepareOrderToShipQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "prepareOrderToShip", params],
    () => helpers.prepareOrderToShip(params),
    options
  );
};

/**
 * Download address card
 * React Query hook for GET /orders/{id}/download-address-card
 */
export const useDownloadOrderAddressCardQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "downloadOrderAddressCard", params],
    () => helpers.downloadOrderAddressCard(params),
    options
  );
};

/**
 * Ship an order
 * React Query mutation hook for POST /api/orders/{id}/ship
 */
export const useShipOrderMutation = (options: any = {}) => {
  return useTypedMutation((params?: any) => helpers.shipOrder(params), options);
};

/**
 * Cancel an order
 * React Query mutation hook for POST /api/orders/{id}/cancel
 */
export const useCancelOrderMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.cancelOrder(params),
    options
  );
};

/**
 * Get price adjustments
 * React Query hook for GET /api/price-adjustments
 */
export const useGetPriceAdjustmentsQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getPriceAdjustments", params],
    () => helpers.getPriceAdjustments(params),
    options
  );
};

/**
 * Create a new price adjustment
 * React Query mutation hook for POST /api/price-adjustments
 */
export const useCreatePriceAdjustmentMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.createPriceAdjustment(params),
    options
  );
};

/**
 * Get price adjustment by ID
 * React Query hook for GET /api/price-adjustments/{id}
 */
export const useGetPriceAdjustmentByIdQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getPriceAdjustmentById", params],
    () => helpers.getPriceAdjustmentById(params),
    options
  );
};

/**
 * Update a price adjustment
 * React Query mutation hook for PUT /api/price-adjustments/{id}
 */
export const useUpdatePriceAdjustmentMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.updatePriceAdjustment(params),
    options
  );
};

/**
 * Delete a price adjustment
 * React Query mutation hook for DELETE /api/price-adjustments/{id}
 */
export const useDeletePriceAdjustmentMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.deletePriceAdjustment(params),
    options
  );
};

/**
 * Get Products List
 * React Query hook for GET /api/products
 */
export const useGetProductsQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getProducts", params],
    () => helpers.getProducts(params),
    options
  );
};

/**
 * Get Product catalog
 * React Query hook for GET /api/product-catalogs
 */
export const useGetProductCatalogsQuery = (options: QueryConfig = {}) => {
  return useTypedQuery(
    ["api", "getProductCatalogs"],
    () => helpers.getProductCatalogs(),
    options
  );
};

/**
 * Insert Product catalog
 * React Query mutation hook for POST /api/product-catalogs
 */
export const useAddProductCatalogMutation = (options: any = {}) => {
  return useTypedMutation(
    (params?: any) => helpers.addProductCatalog(params),
    options
  );
};

/**
 * Get Product By id
 * React Query hook for GET /api/products/{id}
 */
export const useGetProductByIdQuery = (
  params?: any,
  options: QueryConfig = {}
) => {
  return useTypedQuery(
    ["api", "getProductById", params],
    () => helpers.getProductById(params),
    options
  );
};

/**
 * Get product categories
 * React Query hook for GET /api/products/categories
 */
export const useGetProductCategoriesQuery = (options: QueryConfig = {}) => {
  return useTypedQuery(
    ["api", "getProductCategories"],
    () => helpers.getProductCategories(),
    options
  );
};

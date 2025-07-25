// src/lib/api/helpers.ts
// Auto-generated - do not edit manually
import { apiClient, handleApiResponse } from "./client";

/**
 * Get balance sheets
 * GET /api/admin/balances
 */
export const getAdminBalanceSheets = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/admin/balances", params));
};

/**
 * Get balance sheet by ID
 * GET /api/admin/balances/{id}
 */
export const getAdminBalanceSheetById = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/admin/balances/{id}", params));
};

/**
 * Get invoices
 * GET /api/admin/invoices
 */
export const getAdminInvoices = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/admin/invoices", params));
};

/**
 * Get invoice by ID
 * GET /api/admin/invoices/{id}
 */
export const getAdminInvoiceById = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/admin/invoices/{id}", params));
};

/**
 * Mark an invoice as paid
 * POST /api/admin/invoices/{id}/pay
 */
export const payAdminInvoice = async (params?: any) => {
  return handleApiResponse(
    apiClient.POST("/api/admin/invoices/{id}/pay", params)
  );
};

/**
 * Get admin markups
 * GET /api/admin/markups
 */
export const getAdminMarkups = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/admin/markups", params));
};

/**
 * Create a new markup
 * POST /api/admin/markups
 */
export const createAdminMarkup = async (params?: any) => {
  return handleApiResponse(apiClient.POST("/api/admin/markups", params));
};

/**
 * Get markup by ID
 * GET /api/admin/markups/{id}
 */
export const getAdminMarkupById = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/admin/markups/{id}", params));
};

/**
 * Update an existing markup
 * PUT /api/admin/markups/{id}
 */
export const updateAdminMarkup = async (params?: any) => {
  return handleApiResponse(apiClient.PUT("/api/admin/markups/{id}", params));
};

/**
 * Delete a markup
 * DELETE /api/admin/markups/{id}
 */
export const deleteAdminMarkup = async (params?: any) => {
  return handleApiResponse(apiClient.DELETE("/api/admin/markups/{id}", params));
};

/**
 * Get admin orders
 * GET /api/admin/orders
 */
export const getAdminOrders = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/admin/orders", params));
};

/**
 * Get admin order by ID
 * GET /api/admin/orders/{id}
 */
export const getAdminOrderById = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/admin/orders/{id}", params));
};

/**
 * Return products from an order
 * POST /api/admin/orders/{id}/return
 */
export const returnAdminOrderProducts = async (params?: any) => {
  return handleApiResponse(
    apiClient.POST("/api/admin/orders/{id}/return", params)
  );
};

/**
 * Get admin products
 * GET /api/admin/products
 */
export const getAdminProducts = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/admin/products", params));
};

/**
 * Get admin product catalogs
 * GET /api/admin/product-catalogs
 */
export const getAdminProductCatalogs = async (params?: any) => {
  return handleApiResponse(
    apiClient.GET("/api/admin/product-catalogs", params)
  );
};

/**
 * Get admin product by ID
 * GET /api/admin/products/{id}
 */
export const getAdminProductById = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/admin/products/{id}", params));
};

/**
 * Get admin users
 * GET /api/admin/users
 */
export const getAdminUsers = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/admin/users", params));
};

/**
 * Activate a user
 * POST /api/admin/users/{id}/activate
 */
export const activateAdminUser = async (params?: any) => {
  return handleApiResponse(
    apiClient.POST("/api/admin/users/{id}/activate", params)
  );
};

/**
 * Adds user to admin group
 * POST /api/admin/users/{id}/add-admin
 */
export const addAdminUser = async (params?: any) => {
  return handleApiResponse(
    apiClient.POST("/api/admin/users/{id}/add-admin", params)
  );
};

/**
 * Register a new user
 * POST /api/register
 */
export const registerUser = async (params?: any) => {
  return handleApiResponse(apiClient.POST("/api/register", params));
};

/**
 * User Login
 * POST /api/login
 */
export const loginUser = async (params?: any) => {
  return handleApiResponse(apiClient.POST("/api/login", params));
};

/**
 * User Logout
 * POST /api/logout
 */
export const logoutUser = async () => {
  return handleApiResponse(apiClient.POST("/api/logout"));
};

/**
 * Get User Profile
 * GET /api/profile
 */
export const getUserProfile = async () => {
  return handleApiResponse(apiClient.GET("/api/profile"));
};

/**
 * Update User Profile
 * POST /api/profile
 */
export const updateUserProfile = async (params?: any) => {
  return handleApiResponse(apiClient.POST("/api/profile", params));
};

/**
 * Forgot Password
 * POST /api/forgot-password
 */
export const forgotPassword = async (params?: any) => {
  return handleApiResponse(apiClient.POST("/api/forgot-password", params));
};

/**
 * Reset Password
 * POST /api/reset-password
 */
export const resetPassword = async (params?: any) => {
  return handleApiResponse(apiClient.POST("/api/reset-password", params));
};

/**
 * Get balance sheets
 * GET /api/balances
 */
export const getBalanceSheets = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/balances", params));
};

/**
 * Get balance summary
 * GET /api/balances-summary
 */
export const getBalanceSummary = async () => {
  return handleApiResponse(apiClient.GET("/api/balances-summary"));
};

/**
 * Get balance sheet by ID
 * GET /api/balances/{id}
 */
export const getBalanceSheetById = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/balances/{id}", params));
};

/**
 * Get list of courier types
 * GET /api/carriage/couriers
 */
export const getCouriers = async () => {
  return handleApiResponse(apiClient.GET("/api/carriage/couriers"));
};

/**
 * Get paginated list of courier orders for authenticated user
 * GET /api/carriage/pickup-orders
 */
export const getPickupOrders = async (params?: any) => {
  return handleApiResponse(
    apiClient.GET("/api/carriage/pickup-orders", params)
  );
};

/**
 * Create a courier order
 * POST /api/carriage/pickup-orders
 */
export const createPickupOrder = async (params?: any) => {
  return handleApiResponse(
    apiClient.POST("/api/carriage/pickup-orders", params)
  );
};

/**
 * Cancel a courier pickup
 * POST /api/carriage/pickup-orders/{id}/cancel
 */
export const cancelPickupOrder = async (params?: any) => {
  return handleApiResponse(
    apiClient.POST("/api/carriage/pickup-orders/{id}/cancel", params)
  );
};

/**
 * Get courier order for user
 * GET /api/carriage/pickup-orders/{id}
 */
export const getPickupOrdersById = async (params?: any) => {
  return handleApiResponse(
    apiClient.GET("/api/carriage/pickup-orders/{id}", params)
  );
};

/**
 * Get invoices
 * GET /api/invoices
 */
export const getInvoices = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/invoices", params));
};

/**
 * Get invoice summary
 * GET /api/invoices-summary
 */
export const getInvoiceSummary = async () => {
  return handleApiResponse(apiClient.GET("/api/invoices-summary"));
};

/**
 * Get invoice by ID
 * GET /api/invoices/{id}
 */
export const getInvoiceById = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/invoices/{id}", params));
};

/**
 * Get orders with filters
 * GET /api/orders
 */
export const getOrders = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/orders", params));
};

/**
 * Get order statistics
 * GET /api/orders/stats
 */
export const getOrderStats = async () => {
  return handleApiResponse(apiClient.GET("/api/orders/stats"));
};

/**
 * Get daily order statistics
 * GET /api/order/daily-stats
 */
export const getDailyOrderStats = async () => {
  return handleApiResponse(apiClient.GET("/api/order/daily-stats"));
};

/**
 * Get order count by status
 * GET /api/orders/count
 */
export const getOrderCountByStatus = async () => {
  return handleApiResponse(apiClient.GET("/api/orders/count"));
};

/**
 * Get order by ID
 * GET /api/orders/{id}
 */
export const getOrderById = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/orders/{id}", params));
};

/**
 * Confirm an order
 * POST /api/orders/{id}/confirm
 */
export const confirmOrder = async (params?: any) => {
  return handleApiResponse(apiClient.POST("/api/orders/{id}/confirm", params));
};

/**
 * Get address card for order
 * GET /api/orders/{id}/address-card
 */
export const prepareOrderToShip = async (params?: any) => {
  return handleApiResponse(
    apiClient.GET("/api/orders/{id}/address-card", params)
  );
};

/**
 * Download address card
 * GET /orders/{id}/download-address-card
 */
export const downloadOrderAddressCard = async (params?: any) => {
  return handleApiResponse(
    apiClient.GET("/orders/{id}/download-address-card", params)
  );
};

/**
 * Ship an order
 * POST /api/orders/{id}/ship
 */
export const shipOrder = async (params?: any) => {
  return handleApiResponse(apiClient.POST("/api/orders/{id}/ship", params));
};

/**
 * Cancel an order
 * POST /api/orders/{id}/cancel
 */
export const cancelOrder = async (params?: any) => {
  return handleApiResponse(apiClient.POST("/api/orders/{id}/cancel", params));
};

/**
 * Get price adjustments
 * GET /api/price-adjustments
 */
export const getPriceAdjustments = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/price-adjustments", params));
};

/**
 * Create a new price adjustment
 * POST /api/price-adjustments
 */
export const createPriceAdjustment = async (params?: any) => {
  return handleApiResponse(apiClient.POST("/api/price-adjustments", params));
};

/**
 * Get price adjustment by ID
 * GET /api/price-adjustments/{id}
 */
export const getPriceAdjustmentById = async (params?: any) => {
  return handleApiResponse(
    apiClient.GET("/api/price-adjustments/{id}", params)
  );
};

/**
 * Update a price adjustment
 * PUT /api/price-adjustments/{id}
 */
export const updatePriceAdjustment = async (params?: any) => {
  return handleApiResponse(
    apiClient.PUT("/api/price-adjustments/{id}", params)
  );
};

/**
 * Delete a price adjustment
 * DELETE /api/price-adjustments/{id}
 */
export const deletePriceAdjustment = async (params?: any) => {
  return handleApiResponse(
    apiClient.DELETE("/api/price-adjustments/{id}", params)
  );
};

/**
 * Get Products List
 * GET /api/products
 */
export const getProducts = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/products", params));
};

/**
 * Get Product catalog
 * GET /api/product-catalogs
 */
export const getProductCatalogs = async () => {
  return handleApiResponse(apiClient.GET("/api/product-catalogs"));
};

/**
 * Insert Product catalog
 * POST /api/product-catalogs
 */
export const addProductCatalog = async (params?: any) => {
  return handleApiResponse(apiClient.POST("/api/product-catalogs", params));
};

/**
 * Get Product By id
 * GET /api/products/{id}
 */
export const getProductById = async (params?: any) => {
  return handleApiResponse(apiClient.GET("/api/products/{id}", params));
};

/**
 * Get product categories
 * GET /api/products/categories
 */
export const getProductCategories = async () => {
  return handleApiResponse(apiClient.GET("/api/products/categories"));
};

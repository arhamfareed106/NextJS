// src/types/index.ts
// Auto-generated - do not edit manually
// Clean exports from OpenAPI generated api.ts

// Import available types (only what exists in schema)
import type { components, paths, operations } from "./api";

// ===== SCHEMA TYPES =====
// Extract types from components.schemas
export type ABalanceSheet = components["schemas"]["ABalanceSheet"];
export type ABalanceSheetCollection =
  components["schemas"]["ABalanceSheetCollection"];
export type AInvoice = components["schemas"]["AInvoice"];
export type AInvoiceCollection = components["schemas"]["AInvoiceCollection"];
export type AMarkup = components["schemas"]["AMarkup"];
export type AMarkupCollection = components["schemas"]["AMarkupCollection"];
export type AOrderEvent = components["schemas"]["AOrderEvent"];
export type AOrderModification = components["schemas"]["AOrderModification"];
export type AOrderModificationCollection =
  components["schemas"]["AOrderModificationCollection"];
export type AOrder = components["schemas"]["AOrder"];
export type AOrderCollection = components["schemas"]["AOrderCollection"];
export type AProductCatalog = components["schemas"]["AProductCatalog"];
export type AProductCollection = components["schemas"]["AProductCollection"];
export type BalanceSheet = components["schemas"]["BalanceSheet"];
export type BalanceSheetCollection =
  components["schemas"]["BalanceSheetCollection"];
export type CourierOrder = components["schemas"]["CourierOrder"];
export type CourierOrderCollection =
  components["schemas"]["CourierOrderCollection"];
export type PaginationMeta = components["schemas"]["PaginationMeta"];
export type Invoice = components["schemas"]["Invoice"];
export type InvoiceCollection = components["schemas"]["InvoiceCollection"];
export type Modification = components["schemas"]["Modification"];
export type ModificationCollection =
  components["schemas"]["ModificationCollection"];
export type OrderEvent = components["schemas"]["OrderEvent"];
export type OrderModification = components["schemas"]["OrderModification"];
export type Order = components["schemas"]["Order"];
export type OrderCollection = components["schemas"]["OrderCollection"];
export type PriceAdjustment = components["schemas"]["PriceAdjustment"];
export type PriceAdjustmentCollection =
  components["schemas"]["PriceAdjustmentCollection"];
export type ProductCatalog = components["schemas"]["ProductCatalog"];
export type ProductCatalogCollection =
  components["schemas"]["ProductCatalogCollection"];
export type UserProfile = components["schemas"]["UserProfile"];
export type User = components["schemas"]["User"];
export type UsersCollection = components["schemas"]["UsersCollection"];
// ===== OPERATION TYPES =====
// Extract request/response types from operations (with safe type checking)
export type GetAdminBalanceSheetsRequest =
  operations["getAdminBalanceSheets"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type GetAdminBalanceSheetsResponse =
  operations["getAdminBalanceSheets"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getAdminBalanceSheets"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getAdminBalanceSheets"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetAdminBalanceSheetByIdRequest =
  operations["getAdminBalanceSheetById"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type GetAdminBalanceSheetByIdResponse =
  operations["getAdminBalanceSheetById"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getAdminBalanceSheetById"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getAdminBalanceSheetById"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetAdminInvoicesRequest = operations["getAdminInvoices"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetAdminInvoicesResponse = operations["getAdminInvoices"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getAdminInvoices"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getAdminInvoices"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetAdminInvoiceByIdRequest =
  operations["getAdminInvoiceById"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type GetAdminInvoiceByIdResponse =
  operations["getAdminInvoiceById"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getAdminInvoiceById"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getAdminInvoiceById"] extends { responses: { 204: any } }
    ? void
    : never;

export type PayAdminInvoiceRequest = operations["payAdminInvoice"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type PayAdminInvoiceResponse = operations["payAdminInvoice"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["payAdminInvoice"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["payAdminInvoice"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetAdminMarkupsRequest = operations["getAdminMarkups"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetAdminMarkupsResponse = operations["getAdminMarkups"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getAdminMarkups"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getAdminMarkups"] extends { responses: { 204: any } }
  ? void
  : never;

export type CreateAdminMarkupRequest = operations["createAdminMarkup"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type CreateAdminMarkupResponse =
  operations["createAdminMarkup"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["createAdminMarkup"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["createAdminMarkup"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetAdminMarkupByIdRequest =
  operations["getAdminMarkupById"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type GetAdminMarkupByIdResponse =
  operations["getAdminMarkupById"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getAdminMarkupById"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getAdminMarkupById"] extends { responses: { 204: any } }
    ? void
    : never;

export type UpdateAdminMarkupRequest = operations["updateAdminMarkup"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type UpdateAdminMarkupResponse =
  operations["updateAdminMarkup"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["updateAdminMarkup"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["updateAdminMarkup"] extends { responses: { 204: any } }
    ? void
    : never;

export type DeleteAdminMarkupRequest = operations["deleteAdminMarkup"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type DeleteAdminMarkupResponse =
  operations["deleteAdminMarkup"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["deleteAdminMarkup"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["deleteAdminMarkup"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetAdminOrdersRequest = operations["getAdminOrders"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetAdminOrdersResponse = operations["getAdminOrders"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getAdminOrders"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getAdminOrders"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetAdminOrderByIdRequest = operations["getAdminOrderById"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetAdminOrderByIdResponse =
  operations["getAdminOrderById"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getAdminOrderById"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getAdminOrderById"] extends { responses: { 204: any } }
    ? void
    : never;

export type ReturnAdminOrderProductsRequest =
  operations["returnAdminOrderProducts"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type ReturnAdminOrderProductsResponse =
  operations["returnAdminOrderProducts"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["returnAdminOrderProducts"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["returnAdminOrderProducts"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetAdminProductsRequest = operations["getAdminProducts"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetAdminProductsResponse = operations["getAdminProducts"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getAdminProducts"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getAdminProducts"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetAdminProductCatalogsRequest =
  operations["getAdminProductCatalogs"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type GetAdminProductCatalogsResponse =
  operations["getAdminProductCatalogs"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getAdminProductCatalogs"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getAdminProductCatalogs"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetAdminProductByIdRequest =
  operations["getAdminProductById"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type GetAdminProductByIdResponse =
  operations["getAdminProductById"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getAdminProductById"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getAdminProductById"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetAdminUsersRequest = operations["getAdminUsers"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetAdminUsersResponse = operations["getAdminUsers"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getAdminUsers"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getAdminUsers"] extends { responses: { 204: any } }
  ? void
  : never;

export type ActivateAdminUserRequest = operations["activateAdminUser"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type ActivateAdminUserResponse =
  operations["activateAdminUser"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["activateAdminUser"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["activateAdminUser"] extends { responses: { 204: any } }
    ? void
    : never;

export type AddAdminUserRequest = operations["addAdminUser"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type AddAdminUserResponse = operations["addAdminUser"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["addAdminUser"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["addAdminUser"] extends { responses: { 204: any } }
  ? void
  : never;

export type RegisterUserRequest = operations["registerUser"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type RegisterUserResponse = operations["registerUser"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["registerUser"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["registerUser"] extends { responses: { 204: any } }
  ? void
  : never;

export type LoginUserRequest = operations["loginUser"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type LoginUserResponse = operations["loginUser"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["loginUser"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["loginUser"] extends { responses: { 204: any } }
  ? void
  : never;

export type LogoutUserRequest = operations["logoutUser"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type LogoutUserResponse = operations["logoutUser"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["logoutUser"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["logoutUser"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetUserProfileRequest = operations["getUserProfile"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetUserProfileResponse = operations["getUserProfile"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getUserProfile"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getUserProfile"] extends { responses: { 204: any } }
  ? void
  : never;

export type UpdateUserProfileRequest = operations["updateUserProfile"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type UpdateUserProfileResponse =
  operations["updateUserProfile"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["updateUserProfile"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["updateUserProfile"] extends { responses: { 204: any } }
    ? void
    : never;

export type ForgotPasswordRequest = operations["forgotPassword"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type ForgotPasswordResponse = operations["forgotPassword"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["forgotPassword"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["forgotPassword"] extends { responses: { 204: any } }
  ? void
  : never;

export type ResetPasswordRequest = operations["resetPassword"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type ResetPasswordResponse = operations["resetPassword"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["resetPassword"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["resetPassword"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetBalanceSheetsRequest = operations["getBalanceSheets"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetBalanceSheetsResponse = operations["getBalanceSheets"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getBalanceSheets"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getBalanceSheets"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetBalanceSummaryRequest = operations["getBalanceSummary"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetBalanceSummaryResponse =
  operations["getBalanceSummary"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getBalanceSummary"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getBalanceSummary"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetBalanceSheetByIdRequest =
  operations["getBalanceSheetById"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type GetBalanceSheetByIdResponse =
  operations["getBalanceSheetById"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getBalanceSheetById"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getBalanceSheetById"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetCouriersRequest = operations["getCouriers"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetCouriersResponse = operations["getCouriers"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getCouriers"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getCouriers"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetPickupOrdersRequest = operations["getPickupOrders"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetPickupOrdersResponse = operations["getPickupOrders"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getPickupOrders"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getPickupOrders"] extends { responses: { 204: any } }
  ? void
  : never;

export type CreatePickupOrderRequest = operations["createPickupOrder"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type CreatePickupOrderResponse =
  operations["createPickupOrder"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["createPickupOrder"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["createPickupOrder"] extends { responses: { 204: any } }
    ? void
    : never;

export type CancelPickupOrderRequest = operations["cancelPickupOrder"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type CancelPickupOrderResponse =
  operations["cancelPickupOrder"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["cancelPickupOrder"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["cancelPickupOrder"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetPickupOrdersByIdRequest =
  operations["getPickupOrdersById"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type GetPickupOrdersByIdResponse =
  operations["getPickupOrdersById"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getPickupOrdersById"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getPickupOrdersById"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetInvoicesRequest = operations["getInvoices"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetInvoicesResponse = operations["getInvoices"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getInvoices"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getInvoices"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetInvoiceSummaryRequest = operations["getInvoiceSummary"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetInvoiceSummaryResponse =
  operations["getInvoiceSummary"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getInvoiceSummary"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getInvoiceSummary"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetInvoiceByIdRequest = operations["getInvoiceById"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetInvoiceByIdResponse = operations["getInvoiceById"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getInvoiceById"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getInvoiceById"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetOrdersRequest = operations["getOrders"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetOrdersResponse = operations["getOrders"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getOrders"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getOrders"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetOrderStatsRequest = operations["getOrderStats"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetOrderStatsResponse = operations["getOrderStats"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getOrderStats"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getOrderStats"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetDailyOrderStatsRequest =
  operations["getDailyOrderStats"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type GetDailyOrderStatsResponse =
  operations["getDailyOrderStats"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getDailyOrderStats"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getDailyOrderStats"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetOrderCountByStatusRequest =
  operations["getOrderCountByStatus"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type GetOrderCountByStatusResponse =
  operations["getOrderCountByStatus"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getOrderCountByStatus"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getOrderCountByStatus"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetOrderByIdRequest = operations["getOrderById"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetOrderByIdResponse = operations["getOrderById"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getOrderById"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getOrderById"] extends { responses: { 204: any } }
  ? void
  : never;

export type ConfirmOrderRequest = operations["confirmOrder"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type ConfirmOrderResponse = operations["confirmOrder"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["confirmOrder"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["confirmOrder"] extends { responses: { 204: any } }
  ? void
  : never;

export type PrepareOrderToShipRequest =
  operations["prepareOrderToShip"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type PrepareOrderToShipResponse =
  operations["prepareOrderToShip"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["prepareOrderToShip"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["prepareOrderToShip"] extends { responses: { 204: any } }
    ? void
    : never;

export type DownloadOrderAddressCardRequest =
  operations["downloadOrderAddressCard"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type DownloadOrderAddressCardResponse =
  operations["downloadOrderAddressCard"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["downloadOrderAddressCard"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["downloadOrderAddressCard"] extends { responses: { 204: any } }
    ? void
    : never;

export type ShipOrderRequest = operations["shipOrder"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type ShipOrderResponse = operations["shipOrder"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["shipOrder"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["shipOrder"] extends { responses: { 204: any } }
  ? void
  : never;

export type CancelOrderRequest = operations["cancelOrder"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type CancelOrderResponse = operations["cancelOrder"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["cancelOrder"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["cancelOrder"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetPriceAdjustmentsRequest =
  operations["getPriceAdjustments"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type GetPriceAdjustmentsResponse =
  operations["getPriceAdjustments"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getPriceAdjustments"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getPriceAdjustments"] extends { responses: { 204: any } }
    ? void
    : never;

export type CreatePriceAdjustmentRequest =
  operations["createPriceAdjustment"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type CreatePriceAdjustmentResponse =
  operations["createPriceAdjustment"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["createPriceAdjustment"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["createPriceAdjustment"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetPriceAdjustmentByIdRequest =
  operations["getPriceAdjustmentById"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type GetPriceAdjustmentByIdResponse =
  operations["getPriceAdjustmentById"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getPriceAdjustmentById"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getPriceAdjustmentById"] extends { responses: { 204: any } }
    ? void
    : never;

export type UpdatePriceAdjustmentRequest =
  operations["updatePriceAdjustment"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type UpdatePriceAdjustmentResponse =
  operations["updatePriceAdjustment"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["updatePriceAdjustment"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["updatePriceAdjustment"] extends { responses: { 204: any } }
    ? void
    : never;

export type DeletePriceAdjustmentRequest =
  operations["deletePriceAdjustment"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type DeletePriceAdjustmentResponse =
  operations["deletePriceAdjustment"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["deletePriceAdjustment"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["deletePriceAdjustment"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetProductsRequest = operations["getProducts"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetProductsResponse = operations["getProducts"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getProducts"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getProducts"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetProductCatalogsRequest =
  operations["getProductCatalogs"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type GetProductCatalogsResponse =
  operations["getProductCatalogs"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getProductCatalogs"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getProductCatalogs"] extends { responses: { 204: any } }
    ? void
    : never;

export type AddProductCatalogRequest = operations["addProductCatalog"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type AddProductCatalogResponse =
  operations["addProductCatalog"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["addProductCatalog"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["addProductCatalog"] extends { responses: { 204: any } }
    ? void
    : never;

export type GetProductByIdRequest = operations["getProductById"] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;
export type GetProductByIdResponse = operations["getProductById"] extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : operations["getProductById"] extends {
      responses: { 201: { content: { "application/json": infer T } } };
    }
  ? T
  : operations["getProductById"] extends { responses: { 204: any } }
  ? void
  : never;

export type GetProductCategoriesRequest =
  operations["getProductCategories"] extends {
    requestBody: { content: { "application/json": infer T } };
  }
    ? T
    : never;
export type GetProductCategoriesResponse =
  operations["getProductCategories"] extends {
    responses: { 200: { content: { "application/json": infer T } } };
  }
    ? T
    : operations["getProductCategories"] extends {
        responses: { 201: { content: { "application/json": infer T } } };
      }
    ? T
    : operations["getProductCategories"] extends { responses: { 204: any } }
    ? void
    : never;

// ===== UTILITY TYPES =====
export type FormState<T> = {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isDirty: boolean;
};

export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
};

export type ApiError = {
  message: string;
  status?: number;
  details?: any;
};

export type LoadingState = "idle" | "loading" | "success" | "error";

export type SelectOption<T = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

// ===== OPENAPI TYPES (for internal use) =====
// Only export what actually exists in your schema
export type { components, paths, operations } from "./api";

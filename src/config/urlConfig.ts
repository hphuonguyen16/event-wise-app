import { publicDecrypt } from "crypto";
import { create } from "domain";

const domain = "http://localhost:8000";

const UrlConfig: any = {
  user: {
    login: `${domain}/api/v1/users/login`,
    signup: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/signup`,
    refresh: `/api/v1/users/refresh`,
    forgotPassword: "/api/v1/users/forgotPassword",
  },
  me: {
    getMe: `${domain}/api/v1/users/me`,
    checkId: (id: string) => `/api/v1/users/checkId/${id}`,
    getMyNumberOfFollows: `/api/v1/follows/getMyNumberOfFollows`,
    getMyFollowerList: `/api/v1/follows/getMyFollowerList`,
    getMyFollowingList: `/api/v1/follows/getMyFollowingList`,
    isFollowing: `/api/v1/follows/isFollowing/:id`,
    unfollow: `/api/v1/follows/unfollow/:id`,
    followingOtherUser: `/api/v1/follows/followingOtherUser`,
    suggestFollow: `/api/v1/follows/suggestFollow`,
    updateProfile: `${domain}/api/v1/users/updateMe`,
    createReport: `/api/v1/reports/createReport`,
    isFollowingOtherUser: (id: string) => `/api/v1/follows/isFollowing/${id}`,
    unFollowOtherUser: (id: string) => `/api/v1/follows/unfollow/${id}`,
    getProfileById: (id: string) =>
      `${domain}/api/v1/users/getProfileByID/${id}`,
  },
  event: {
    createEvent: `${domain}/api/v1/events`,
    getAllEvents: `${domain}/api/v1/events`,
    getEvent: (id: string) => `${domain}/api/v1/events/${id}`,
    getMyEvents: `${domain}/api/v1/events/my-events`,
    deleteEvent: (id: string) => `${domain}/api/v1/events/${id}`,
    updateEvent: (id: string) => `${domain}/api/v1/events/${id}`,
    publishEvent: `${domain}/api/v1/events/publish`,
  },
  ticketType: {
    getTicketTypesByEventId: (eventId: string) =>
      `${domain}/api/v1/events/${eventId}/ticket-types`,
    deleteTicketType: (ticketTypeId: string) =>
      `${domain}/api/v1/ticket-types/${ticketTypeId}`,
    createTicketType: `${domain}/api/v1/ticket-types`,
    updateTicketType: (ticketTypeId: string) =>
      `${domain}/api/v1/ticket-types/${ticketTypeId}`,
  },
  order: {
    getOrdersByEventId: (eventId: string) =>
      `${domain}/api/v1/events/${eventId}/registrations`,
    createOrder: `${domain}/api/v1/registrations`,
    getAllOrders: `${domain}/api/v1/registrations`,
    deleteOrder: (orderId: string) =>
      `${domain}/api/v1/registrations/${orderId}`,
    myOrders: `${domain}/api/v1/registrations/my-registrations`,
  },
  category: {
    getAllCategories: `${domain}/api/v1/categories`,
    getPopularCategories: `${domain}/api/v1/categories/popular`,
  },
  search: {
    searchEvents: `${domain}/api/v1/events/search`,
  },
  transaction: {
    deposit: `${domain}/api/v1/transactions/deposit`,
    getAllTransactions: `${domain}/api/v1/transactions/all`,
  },
  bankAccount: {
    createBankAccount: `${domain}/api/v1/bank-accounts/me`,
    getMyBankAccount: `${domain}/api/v1/bank-accounts/me`,
    updateBankAccount: (id: string) => `${domain}/api/v1/bank-accounts/${id}`,
  },
  withdrawal: {
    createWithdrawalRequest: `${domain}/api/v1/withdrawal-requests`,
  },
};

export default UrlConfig;

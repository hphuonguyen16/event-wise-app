const domain = 'http://localhost:8000';

const UrlConfig: any = {
  user: {
    login: `${domain}/api/v1/users/login`,
    signup: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/signup`,
    refresh: `/api/v1/users/refresh`,
    forgotPassword: "/api/v1/users/forgotPassword",
  },
  me: {
    getMe: `/api/v1/users/me`,
    checkId: (id: string) => `/api/v1/users/checkId/${id}`,
    getMyNumberOfFollows: `/api/v1/follows/getMyNumberOfFollows`,
    getMyFollowerList: `/api/v1/follows/getMyFollowerList`,
    getMyFollowingList: `/api/v1/follows/getMyFollowingList`,
    isFollowing: `/api/v1/follows/isFollowing/:id`,
    unfollow: `/api/v1/follows/unfollow/:id`,
    followingOtherUser: `/api/v1/follows/followingOtherUser`,
    suggestFollow: `/api/v1/follows/suggestFollow`,
    updateProfile: `/api/v1/users/updateMe`,
    createReport: `/api/v1/reports/createReport`,
    isFollowingOtherUser: (id: string) => `/api/v1/follows/isFollowing/${id}`,
    unFollowOtherUser: (id: string) => `/api/v1/follows/unfollow/${id}`,
  },
  event: {
    createEvent: `${domain}/api/v1/events`,
    getEvent: (id: string) => `${domain}/api/v1/events/${id}`,
    getMyEvents: `${domain}/api/v1/events/my-events`,
    deleteEvent: (id: string) => `${domain}/api/v1/events/${id}`,
  },
  ticketType: {
    getTicketTypesByEventId: (eventId: string) => `${domain}/api/v1/events/${eventId}/ticket-types`,
    deleteTicketType: (ticketTypeId: string) => `${domain}/api/v1/ticket-types/${ticketTypeId}`,
    createTicketType: `${domain}/api/v1/ticket-types`,
    updateTicketType: (ticketTypeId: string) => `${domain}/api/v1/ticket-types/${ticketTypeId}`,
  },
};

export default UrlConfig;

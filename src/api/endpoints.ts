const Endpoints = {
    // app data
    PRODUCTS: '/products',
    CATEGORIES: '/categories',

    // auth
    AUTH_REGISTER: '/auth/register',
    AUTH_LOGIN: '/auth/login',
    AUTH_REFRESH: '/auth/refresh',
    AUTH_LOGOUT: '/auth/logout',
    AUTH_LOGOUT_ALL: '/auth/logout-all',
    PROFILE: '/users/me',
    PROFILE_EMAIL: '/users/me/email',
    PROFILE_PASSWORD: '/users/me/password',

    // mail service
    POST_MAIL_CONTACT: '/mail/contact',
    POST_MAIL_CART: '/mail/cart',
}

export default Endpoints;
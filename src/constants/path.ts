export const Paths = {
    HOME: "/home",
    NOT_FOUND: "*",
    ACCESS_DENIED: "/access-denied",
    AUTH: {
        ROOT: "/auth",
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        FORGOT_PASSWORD: "/auth/forgot-password",
        WAITING_FOR_APPROVAL: "/auth/waiting-for-approval",
    },
    PUBLIC: {
        ROOT: "/",
        CONTACT: "/contact",
        ABOUT: {
            ROOT: "/about",
            TEAM: "/about/team",
            STORY: "/about/story",
        },
        BLOG: {
            ROOT: "/blog",
            ALL: "/blog/all-blog",
            DETAIL: (slug: string) => `/blog/${slug}`,
            DETAIL_PATH: "/blog/:slug",
        },
        PRICING: "/pricing",
        TESTIMONIALS: "/testimonials",
        COMMUNITY: "/community",
        LEADERBOARD: {
            ROOT: "/leaderboard",
            RANKINGS: "/leaderboard/rankings",
            HALL_OF_FAME: "/leaderboard/hall-of-fame",
        },
        PAYMENT: "/payment",

        // in future
        FAQ: "/faq",
        PRIVACY_POLICY: "/privacy-policy",
        TERMS_OF_SERVICE: "/terms-of-service",
    },
    ACCOUNT: {
        ROOT: "/account",
        PROFILE: "/account/profile",
        SETTING: "/account/settings",
        NOTIFICATION: "/account/notifications",
        FEEDBACK: "/account/feedback",
    },
    ADMIN: {
        ROOT: "/admin",
        DASHBOARD: "/admin/dashboard",
        MANAGEMENT: {
            ROOT: "/admin/management",
            BLOG: {
                ROOT: "/admin/management/blog",
                MY_BLOG: "/admin/management/blog/my-blogs",
                CREATE: "/admin/management/blog/create",
                EDIT: (slug: string) => `/admin/management/blog/edit/${slug}`,
                EDIT_PATH: "/admin/management/blog/edit/:slug",
            },
        },
    },
    COACH: {
        ROOT: "/coach",
        DASHBOARD: "/coach/dashboard",
    },
    MEMBER: {
        ROOT: "/member",
        DASHBOARD: "/member/dashboard",
        TRACKING: {
            ROOT: "/member/tracking",
            INFO: "/member/tracking/info",
            CREATE_PLAN: "/member/tracking/create-plan",
        },
    },
};

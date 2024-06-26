export interface Feedback {
    _id?: string;
    userId: string;
    partnerId: string;
    story: string;
    image: string;
    isArchived: boolean;
    createdAt: Date;
}

export interface FeedbackResponse {
    _id: string;
    userId: {
        username: string;
    };
    partnerId: {
        username: string;
    };
    story: string;
    image: string;
    isArchived: boolean;
    createdAt: Date;
}

export interface FeedbackAdminType {
    _id: string;
    userId: {
        username: string;
        userImg: string
    };
    partnerId: {
        username: string;
        partnerImg: string
    };
    story: string;
    image: string;
    isArchived: boolean;
    createdAt: Date;
}

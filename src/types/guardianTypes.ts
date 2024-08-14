export interface GuardianArticleDetails {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
}
interface Edition {
    id: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    code: string;
}

export interface SectionTypes {
    id: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    editions: Edition[];
}

interface Response {
    status: string;
    userTier: string;
    total: number;
    results: SectionTypes[];
}

export interface GuardianSectionApiResponse {
    response: Response;
}

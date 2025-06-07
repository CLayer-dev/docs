export interface DocumentationContent {
    id: string;
    title: string;
    content: string;
    frontmatter: Record<string, any>;
    filePath: string;
    category: string;
}

export interface AIResponse {
    message: string;
    isDetailed: boolean;
    isTechnical: boolean;
    timestamp: number;
    sources?: string[];
}

export interface AIServiceOptions {
    responseType?: 'brief' | 'detailed';
    technicalLevel?: 'basic' | 'technical';
}

export interface SearchOptions {
    query: string;
    category?: string;
    limit?: number;
}

export interface DocumentationIndex {
    [key: string]: DocumentationContent;
} 
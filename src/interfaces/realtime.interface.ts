export interface RealtimePayload {
    commit_timestamp: string;
    errors: any[];
    eventType: string;
    new: {
        created_at: string;
        id: number;
        message: string;
        user: string | null;
    };
    old: {
        created_at: string;
        id: number;
        message: string;
        user: string | null;
    };
    schema: string;
    table: string;
}
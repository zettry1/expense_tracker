export interface Todo {
    _id?: string;
    title: string;
    description: string;
    timestamp: number;
    completed: boolean;
    user: {
        user_id: string,
        fullname: string
    }
}
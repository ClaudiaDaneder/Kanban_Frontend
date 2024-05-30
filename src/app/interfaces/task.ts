

export interface Task {
    id?: number;
    title: string;
    description: string;
    status: number;
    priority: number;
    deadline: Date;
    board: number;
    project_lead: number;
    created_at: Date;
}

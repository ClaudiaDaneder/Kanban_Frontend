import { Board } from "./board";

export interface Task {
    title: string;
    description: string;
    status: string;
    due_date: Date | null;
    board: Board; // Verweis auf das zugehörige Board
    created_at: Date;
    updated_at: Date;
}

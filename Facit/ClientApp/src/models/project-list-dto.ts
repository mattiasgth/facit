import { Project } from './project';

export interface ProjectListDTO extends Project {
    transactions: {
        description: string,
        id: string,
        when: Date,
        total: number
    }[]
}

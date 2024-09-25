import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "src/project/entities/project.entity";
import { Task } from "src/task/entities/task.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 'user' })
    role: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Project, (project) => project.user, {cascade: true})
    projects: Project[];

    @OneToMany(() => Task, (task) => task.user, {cascade: true})
    tasks: Task[];
}


import { Project } from "src/project/entities/project.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true})
    description: string;

    @Column({type: 'timestamp'})
    dueDate: Date;

    @Column({ default: 'pending'})
    status: string;

    @ManyToOne(()=> Project, (project) => project.tasks)
    project: Project;

    @ManyToOne(()=> User, (user)=> user.tasks)
    user: User;
}

import { Project } from "src/project/entities/project.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

enum TasKStatus{
       PENDING = 'pending',
       IN_PROGRESS = 'in_progress',
       COMPLETED = 'completed' 
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true, default: ''})
    description: string;

    @Column({type: 'timestamp'})
    dueDate: Date;

    @Column({ type: 'enum', enum: TasKStatus, default: TasKStatus.PENDING})
    status: string;

    @ManyToOne(()=> Project, (project) => project.tasks, {onDelete: 'CASCADE'})
    project: Project;

    @ManyToOne(()=> User, (user)=> user.tasks, { onDelete: 'CASCADE'})
    user: User;
}

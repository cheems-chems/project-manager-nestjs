import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true, default: ''})
    description: string;

    @Column({ type: 'timestamp'})
    startDate: Date;

    @Column({ type: 'timestamp'})
    endDate: Date;

    @ManyToOne(()=> User, (user)=> user.projects)
    user: User;

    @OneToMany(()=> Task, (task)=> task.project)
    tasks: Task[];
}
 
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import Client from "./user.entity"

@Entity("contact")
class Contacts{

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    phone_number: string

    @CreateDateColumn()
    registred_at: Date

    @ManyToOne(() => User, (User) => User.contacts)
    user: Client
}

export default Contacts
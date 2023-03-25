import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import Client from "./user.entity"

@Entity("contact")
class Contacts{

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    phone_number: string

    @CreateDateColumn()
    registred_at: Date

    @ManyToOne(() => User, (User) => User.contacts)
    user: Client
}

export default Contacts
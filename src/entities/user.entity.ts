import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Contacts from "./contacts.entities";

@Entity("user")
class User{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Exclude()
    @Column()
    password: string

    @Column()
    phone_number: string

    @CreateDateColumn()
    created_at: Date

    @OneToMany(() => Contacts, (Contacts) => Contacts.user)
    contacts: Contacts[]
    
}

export default User
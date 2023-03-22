import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

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

}

export default User
import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {ulid} from "ulid";
import {Account} from "../../../account/data/entity/account.entity";

@Entity()
export class Profile{
    @PrimaryColumn('varchar' , {length: 26 , default:()=> `'${ulid()}'` })
    profile_id:string;
    @Column()
    nbLike:number;
    @OneToOne(() =>Account, (account)=> account.profile)
    @JoinColumn({referencedColumnName:'account_id', name:'account_id_fk'})
    account:Account;
}
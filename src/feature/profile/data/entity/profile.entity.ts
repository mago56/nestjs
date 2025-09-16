import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {ulid} from "ulid";
import {Account} from "../../../account/data/entity/account.entity";

@Entity()
export class Profile{
    @PrimaryColumn('varchar' , {length: 26 , default:()=> `'${ulid()}'` })
    profile_id:string;
    @Column()
    nbLike:number;
    @ManyToOne(() =>Account, (account)=> account.profiles)
    @JoinColumn({referencedColumnName:'account_id', name:'account_id_fk'})
    account:Account;
}
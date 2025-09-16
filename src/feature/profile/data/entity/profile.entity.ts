import {Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {ulid} from "ulid";
import {Account} from "../../../account/data/entity/account.entity";

@Entity()
export class Profile{
    @PrimaryColumn('varchar' , {length: 26 , default:()=> `'${ulid()}'` })
    profile_id:string;

    nbLike:number;
    @ManyToOne(()=>Account, (account)=> account.profiles)
    account:Account;
}
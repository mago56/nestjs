import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn} from "typeorm";
import {ulid} from "ulid";
import {Account} from "../../../account/data/entity/account.entity";

@Entity()
export class Profile{
    @PrimaryColumn('varchar' , {length: 26 , default:()=> `'${ulid()}'` })
    profile_id:string;
    @Column()
    nbLike:number;
    @ManyToMany(() =>Account, (account)=> account.profiles)
    @JoinTable({
        name:'account_profile',
        inverseJoinColumn: {name:'account_id_fk', referencedColumnName:'account_id'},
        joinColumn:{name:'profile_id_fk', referencedColumnName:'profile_id'},
    })
    accounts:Account[];
}
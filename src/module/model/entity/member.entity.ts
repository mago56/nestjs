import {Column, Entity, PrimaryColumn} from "typeorm";
import {ulid} from "ulid";
import {BaseEntity} from "./BaseEntity";

@Entity()
export class MemberEntity extends BaseEntity{
    @PrimaryColumn('varchar' , {length:26 , default:()=> `'${ulid()}'`})
    member_id:string;

    @Column({length:50 , nullable:true})
    firstname:string;

    @Column({length:50 , nullable:true})
    lastname:string;

    @Column({length:10 , nullable:true})
    gender:string;

    @Column({nullable:true})
    birthdate:Date;

    @Column({length:50 , nullable:true})
    mail:string;

    @Column({length:15 , nullable:true})
    phone:string;

    @Column({length:10 , nullable:true})
    activation:string;

    @Column({length:34 , nullable:true})
    iban:string;

}

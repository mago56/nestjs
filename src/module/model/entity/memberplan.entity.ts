import {BaseEntity} from "./BaseEntity";
import { Entity, PrimaryColumn} from "typeorm";
import {ulid} from "ulid";

@Entity()
export class MemberplanEntity extends BaseEntity{
    @PrimaryColumn('varchar' , {length:26 , default:()=>`'${ulid()}'`})
    member_plan_id:string;


}
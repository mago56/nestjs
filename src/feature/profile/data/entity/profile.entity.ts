import {Entity, PrimaryColumn} from "typeorm";
import {ulid} from "ulid";

@Entity()
export class Profile{
    @PrimaryColumn('varchar' , {length: 26 , default:()=> `'${ulid()}'` })
    profile_id:string;
    nbLike:number;
}
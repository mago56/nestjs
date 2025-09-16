import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import {ulid} from "ulid";
import {Credentials} from "./credentials.entity";

@Entity()
export class Token {
    @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
    token_id: string;
    @Column({nullable: false})
    token: string;
    @Column({nullable: false})
    refreshToken: string;
    @OneToOne(() => Credentials,{eager:true})
    @JoinColumn({name: 'credential_id'})
    credential: Credentials;
}
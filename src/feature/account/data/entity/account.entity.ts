import {Column, CreateDateColumn, Entity,ManyToMany,OneToMany,PrimaryColumn, UpdateDateColumn} from 'typeorm';
import {ulid} from 'ulid';
import {Profile} from "../../../profile/data/entity/profile.entity";

@Entity()
export class Account{
    @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
    account_id:string;
    @Column()
    firstname:string;
    @Column()
    lastname:string;
    @Column()
    birthdate:Date;
    @Column()
    mail:string;

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @ManyToMany(()=>Profile,(profile)=> profile.accounts,{cascade:true, eager:true})
    profiles:Profile[];



}
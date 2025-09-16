import {Column, CreateDateColumn, Entity,PrimaryColumn, UpdateDateColumn} from 'typeorm';
import {ulid} from 'ulid';

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



}
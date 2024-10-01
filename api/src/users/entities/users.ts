import { Vault } from 'src/vault/entities/vault';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Vault, (vault) => vault.user, { cascade: true })
  vaults: Vault[];

  constructor(){
    this.id = uuidv4();
  }
}

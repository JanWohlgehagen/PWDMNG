import { Vault } from 'src/vault/entities/vault';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Vault, (vault) => vault.user, { cascade: true })
  vaults: Vault[];
}

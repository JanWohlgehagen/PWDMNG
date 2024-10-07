import { User } from 'src/users/entities/users';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Vault {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  website: string;

  @Column()
  username: string;

  @Column()
  encryptedPassword: string;

  @Column()
  iv: string;

  @ManyToOne(() => User, (user) => user.vaults)
  user: User; // Reference to the user who owns this vault entry

  constructor(){
    this.id = uuidv4();
  }
}

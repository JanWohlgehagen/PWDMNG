import { User } from 'src/users/entities/users';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Vault {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  website: string;

  @Column()
  username: string;

  @Column()
  encryptedPassword: string;

  @ManyToOne(() => User, (user) => user.vaults)
  user: User; // Reference to the user who owns this vault entry
}

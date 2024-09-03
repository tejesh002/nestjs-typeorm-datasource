import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'masterAccount' })
export class MasterAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;
}

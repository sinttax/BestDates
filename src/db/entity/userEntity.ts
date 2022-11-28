import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id?: number;

  @Column()
  user_email?: string;

  @Column()
  user_name?: string;

  @Column()
  user_password?: string;

  @Column()
  age?: number;

  @Column({ type: 'varchar', length: 10 })
  gender?: string;

  @Column()
  height?: number;

  @Column()
  weight?: number;

  @Column()
  eye_color?: string;

  @Column()
  country?: string;

  @Column()
  additional_info?: string;

  @Column()
  photo_path?: string;
}

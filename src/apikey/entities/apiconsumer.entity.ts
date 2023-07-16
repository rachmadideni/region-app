import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Apikey } from './apikey.entity';

@Entity('api_consumer')
export class ApiConsumer {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Apikey, (apikey) => apikey.consumer)
  apiKey: Apikey;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}

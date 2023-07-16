import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiConsumer } from './apiconsumer.entity';

@Entity('api_key')
export class Apikey {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ApiConsumer, (some) => some.apiKey)
  @JoinColumn({
    name: 'consumer_id',
  })
  consumer: ApiConsumer;

  @Column({
    unique: true,
  })
  key: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
}

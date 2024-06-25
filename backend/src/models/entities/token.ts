import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user";

@Entity()
class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: "datetime" })
  expiresAt: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

export default Token;

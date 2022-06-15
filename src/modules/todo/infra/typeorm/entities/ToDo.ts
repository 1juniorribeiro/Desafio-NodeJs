import { Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';

import { v4 as uuidV4 } from 'uuid';

@Entity('todos')
class ToDo {
  @PrimaryColumn()
  id?: string;

  @Column()
  description: string;

  @Column()
  done: boolean;
  
  @Column()
  priority: string;
  
  @Column()
  finished_at?: Date;
  
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}

export { ToDo };

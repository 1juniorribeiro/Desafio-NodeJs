
enum Priority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

interface ICreateToDoDTO {
  description: string;
  priority: Priority;
  done?: boolean;
  finished_at?: Date;
  id?: string;
}

export { ICreateToDoDTO, Priority };

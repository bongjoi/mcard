import { User } from './user';

export interface Term {
  id: string;
  title: string;
  link?: string;
}

export interface ApplyValues {
  userId: User['uid'];
  terms: Array<Term['id']>;
  appliedAt: Date;
  cardId: string;
  salary: string;
  creditScore: string;
  payDate: string;
  isMaster: boolean;
  isRf: boolean;
  isHipass: boolean;
}

export interface Option {
  label: string;
  value: string | number | undefined;
}

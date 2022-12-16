import { WithName } from './select-data';

export interface FormData {
  name: string | null;
  dateAndTime: string | null;
  email: string | null;
  phone: string | null;
  isApproximateDate?: boolean | null;
  selectOption: WithName | null;
}

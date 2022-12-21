import { WithName } from './select-data';

export interface FormData {
  name: string | null;
  date: Date | null;
  selectedTimeSlot: WithName | null;
  email: string | null;
  phone: string | null;
  selectOption: WithName | null;
}

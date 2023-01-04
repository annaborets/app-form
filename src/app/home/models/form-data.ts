import { WithName } from './select-data';
import { DatepickerObject } from './datepicker-object';

export interface FormData {
  name: string | null;
  date?: Date | null;
  dateRange?: DatepickerObject | null;
  isRangedDate: boolean | null;
  selectedTimeSlot: WithName | null;
  email: string | null;
  phone: string | null;
  selectedOption: WithName | null;
}

export class EventModel {
  event_location: string;
  event_start_time: string;
  event_end_time: string;
  event_title: string;
  event_description: string;
  event_type: string;

  constructor() {
    this.event_location = '';
    this.event_start_time = '';
    this.event_end_time = '';
    this.event_title = '';
    this.event_description = '';
    this.event_type = '';
  }
}

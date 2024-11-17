import { Injectable, NotFoundException } from '@nestjs/common';
import { map, Observable, Subject } from 'rxjs';

export interface EventData {
  data: string; // JSON.stringify<UserResponseDTO>;
}

@Injectable()
export class SseService {
  private eventSubjects: Map<string, Subject<EventData>> = new Map();

  emitEvent(id: string, data: EventData) {
    let eventSubject = this.eventSubjects.get(id);
    if (!eventSubject) {
      eventSubject = new Subject<EventData>();
      this.eventSubjects.set(id, eventSubject);
    }
    eventSubject.next(data);
  }

  clearEvent(id: string) {
    const eventSubject = this.eventSubjects.get(id);
    if (eventSubject) {
      eventSubject.complete();
      this.eventSubjects.delete(id);
    }
  }

  getObservable(eventId: string): Observable<EventData> {
    const eventSubject = this.eventSubjects.get(eventId);
    if (!eventSubject) {
      throw new NotFoundException(`Event stream with ID ${eventId} not found`);
    }
    return eventSubject.asObservable().pipe(map((data) => data));
  }
}

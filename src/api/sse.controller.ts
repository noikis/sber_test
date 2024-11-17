import {
  Controller,
  Get,
  MessageEvent,
  OnModuleDestroy,
  OnModuleInit,
  Res,
  Sse,
} from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('sse')
export class SseController implements OnModuleInit, OnModuleDestroy {
  private stream: {
    id: string;
    subject: ReplaySubject<unknown>;
    observer: Observable<unknown>;
  }[] = [];
  private timer: NodeJS.Timeout;
  private id = 0;

  public onModuleInit(): void {
    this.timer = setInterval(() => {
      this.id += 1;
      this.stream.forEach(({ subject }) => subject.next(this.id));
    }, 1000);
  }

  public onModuleDestroy(): void {
    clearInterval(this.timer);
  }

  @Get('/users/')
  public index(): string {
    return readFileSync(
      join(__dirname, '..', '..', 'public', 'index.html'),
      'utf-8',
    ).toString();
  }

  @Sse('')
  public sse(@Res() response: Response): Observable<MessageEvent> {
    const id = SseController.genStreamId();
    // Clean up the stream when the client disconnects
    response.on('close', () => this.removeStream(id));
    // Create a new stream
    const subject = new ReplaySubject();
    const observer = subject.asObservable();
    this.addStream(subject, observer, id);

    return observer.pipe(
      map(
        (data) =>
          ({
            id: `my-stream-id:${id}`,
            data: `Hello world ${data}`,
            event: 'my-event-name',
          }) as MessageEvent,
      ),
    );
  }

  private addStream(
    subject: ReplaySubject<unknown>,
    observer: Observable<unknown>,
    id: string,
  ): void {
    this.stream.push({
      id,
      subject,
      observer,
    });
  }

  private removeStream(id: string): void {
    this.stream = this.stream.filter((stream) => stream.id !== id);
  }

  private static genStreamId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}

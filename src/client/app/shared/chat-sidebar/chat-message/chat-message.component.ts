import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'chat-message',
    templateUrl: 'chat-message.component.html'
})
export class ChatMessage {
  @Input() conversation: any;
  @Input() open: boolean;
  @Input() searchMessage: string;
  @Output() chatMessageClosed = new EventEmitter();
  newMessage: string = '';

  closeChatArea(): void {
    this.open = false;
    this.chatMessageClosed.emit('');
  }

  addMessage(message:any): void {
    if (this.newMessage) {
      (this.conversation.messages || (this.conversation.messages = [])).push({
        text: this.newMessage,
        fromMe: true
      });
    }
    this.newMessage = '';
  }

}
import {Component, OnInit, ElementRef} from '@angular/core';
import {ChatService} from './chat.service';
declare var jQuery: any;
declare var Hammer: any;

@Component({
    moduleId: module.id,
    selector: '[chat-sidebar]',
    templateUrl: 'chat-sidebar.component.html'
})
export class ChatSidebarComponent implements OnInit {
  conversations: ChatService;
  newMessage: string = '';
  activeConversation: any;
  chatMessageOpened: boolean = false;
  $el: any;

  constructor(el: ElementRef) {
    this.conversations = new ChatService();

    this.$el = jQuery(el.nativeElement);
    this.activeConversation = this.conversations.todayConversations[0];
  }

  openConversation(conversation: any): void {
    this.activeConversation = conversation;
    this.chatMessageOpened = true;
  }

  deactivateLink(e: any): void {
    jQuery(e.currentTarget).removeClass('active').find('.badge').remove();
  }

  initChatSidebarScroll(): void {
    let $sidebarContent = jQuery('.chat-sidebar-contacts', this.$el);
    if (this.$el.find('.slimScrollDiv').length !== 0) {
      $sidebarContent.slimscroll({
        destroy: true
      });
    }
    $sidebarContent.slimscroll({
      height: window.innerHeight,
      width: '',
      size: '4px'
    });
  }

  enableSwipeCollapsing(): void {
    let $chatContainer = jQuery('sd-app');
    let chatSidebarSwipe = new Hammer(document.getElementById('content-wrap'));

    chatSidebarSwipe.on('swipeleft', () => {
      if ($chatContainer.is('.nav-collapsed')) {
        $chatContainer.addClass('chat-sidebar-opened');
      }
    });

    chatSidebarSwipe.on('swiperight', () => {
      setTimeout(() => {
        if ($chatContainer.is('.chat-sidebar-opened')) {
          $chatContainer.removeClass('chat-sidebar-opened');
        }
      });
    });
  }

  ngOnInit(): void {
    jQuery('sd-app').addClass('chat-sidebar-container');

    if ('ontouchstart' in window) {
      this.enableSwipeCollapsing();
    }

    jQuery(window).on('sn:resize', this.initChatSidebarScroll.bind(this));
    this.initChatSidebarScroll();
  }

}

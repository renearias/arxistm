import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap/components/tooltip';

import { ToolbarComponent } from './toolbar/index';
import { NavbarComponent } from './navbar/index';
import { SidebarComponent } from './sidebar/index';
import { NameListService } from './name-list/index';
import { ChatSidebarComponent, ChatMessageComponent } from './chat-sidebar/index';
import { NotificationLoad, NotificationsComponent } from './notifications/index';
import { SearchPipe } from './pipes/index';
import { AppConfig } from './config/app.config';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, TooltipModule],
  declarations: [ToolbarComponent, NavbarComponent, SidebarComponent, ChatSidebarComponent, SearchPipe, NotificationLoad, NotificationsComponent, ChatMessageComponent],
  exports: [ToolbarComponent, NavbarComponent, SidebarComponent, ChatSidebarComponent, ChatMessageComponent,
    CommonModule, FormsModule, RouterModule, TooltipModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AppConfig, NameListService]
    };
  }
}

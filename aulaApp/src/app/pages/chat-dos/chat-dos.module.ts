import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatDosPageRoutingModule } from './chat-dos-routing.module';

import { ChatDosPage } from './chat-dos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChatDosPageRoutingModule
  ],
  declarations: [ChatDosPage]
})
export class ChatDosPageModule {}

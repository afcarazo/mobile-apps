import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatDosPage } from './chat-dos.page';

const routes: Routes = [
  {
    path: '',
    component: ChatDosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatDosPageRoutingModule {}

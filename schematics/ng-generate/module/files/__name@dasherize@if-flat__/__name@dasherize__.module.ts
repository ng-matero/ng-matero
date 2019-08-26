import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
<% if (routing) { %>import { <%= classify(name) %>RoutingModule } from './<%= dasherize(name) %>-routing.module';<% } %>

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,<% if (routing) { %>
    <%= classify(name) %>RoutingModule<% } %>
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class <%= classify(name) %>Module { }

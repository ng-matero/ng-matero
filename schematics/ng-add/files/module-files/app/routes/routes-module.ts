import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared-module';
import { RoutesRoutingModule } from './routes-routing-module';

import { Dashboard } from './dashboard/dashboard';
import { Login } from './sessions/login/login';
import { Register } from './sessions/register/register';
import { Error403 } from './sessions/error-403';
import { Error404 } from './sessions/error-404';
import { Error500 } from './sessions/error-500';

const COMPONENTS: any[] = [Dashboard, Login, Register, Error403, Error404, Error500];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class RoutesModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding }
  },
  {
    path: 'login',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'ingresar-telefono',
    loadChildren: () => import('./ingresar-telefono/ingresar-telefono.module').then( m => m.IngresarTelefonoPageModule)
  },
  {
    path: 'validar',
    loadChildren: () => import('./validar/validar.module').then( m => m.ValidarPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'explorar',
    loadChildren: () => import('./explorar/explorar.module').then( m => m.ExplorarPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'nuevo-servicio',
    loadChildren: () => import('./nuevo-servicio/nuevo-servicio.module').then( m => m.NuevoServicioPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding }
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding }
  },
  {
    path: 'categoria/:cat',
    loadChildren: () => import('./categoria/categoria.module').then( m => m.CategoriaPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding }
  },
  {
    path: 'servicio/:id',
    loadChildren: () => import('./servicio/servicio.module').then( m => m.ServicioPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding }
  },
  {
    path: 'filtrar',
    loadChildren: () => import('./filtrar/filtrar.module').then( m => m.FiltrarPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding }
  },
  {
    path: 'calificar/:id',
    loadChildren: () => import('./calificar/calificar.module').then( m => m.CalificarPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding }
  },
  {
    path: 'buscar/:aroundLatLng',
    loadChildren: () => import('./buscar/buscar.module').then( m => m.BuscarPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding }
  },
  {
    path: 'contratado/:nombreUsuario/:nombreServicio/:usuarioFoto/:telefono/:id',
    loadChildren: () => import('./contratado/contratado.module').then( m => m.ContratadoPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding }
  },
  { path: '',   redirectTo: '/tabs/explorar', pathMatch: 'full' },
  {
    path: 'contratacion/:id',
    loadChildren: () => import('./contratacion/contratacion.module').then( m => m.ContratacionPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

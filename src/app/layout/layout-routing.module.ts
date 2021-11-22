import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { 
                path: '', 
                loadChildren: () => import('./form/form.module').then((m) => m.FormModule)  
            },
            //{path: '',redirectTo: '',pathMatch: 'prefix'},
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            {
                path: 'blank-page',
                loadChildren: () => import('./blank-page/blank-page.module').then((m) => m.BlankPageModule)
            },
            { 
                path: 'overview360',
                loadChildren: () => import('./overview360/overview360.module').then((m) => m.Overview360Module) 
            },
            {
                path: 'graph',
                loadChildren: () => import('./kpigraphs/kpigraphs.module').then((m) => m.KpigraphsModule)
            },
            {
                path: 'asset_details',
                loadChildren: () => import('./overview360/asset-details/asset-details.module').then((m) => m.AssetDetailsModule)
            },
            {
                path: 'alert',
                loadChildren: () => import('./alertdashboard/alertdashboard.module').then((m) => m.AlertdashboardModule)
            },
            {
                path: 'iassessment',
                loadChildren: () => import('./iassessment/iassessment.module').then((m) => m.IassessmentModule)
            },
            {
                path: 'form',
                loadChildren: () => import('./form/form.module').then((m) => m.FormModule)
            },
            {
                path: 'details',
                loadChildren: () => import('./details/details.module').then((m) => m.DetailsModule)
            },
            {
                path: 'admin-dashboard',
                loadChildren: () => import('./admindashboard/admindashboard.module').then((m) => m.AdmindashboardModule)
            },
            {
                path: 'result',
                loadChildren: () => import('./result/result.module').then((m) => m.ResultModule)
            },
            {
                path: 'tier1admindashboard',
                loadChildren: () => import('./tier1admindashboard/tier1admindashboard.module').then((m) => m.Tier1admindashboardModule)
            },
            {
                path: 'question-dashboard',
                loadChildren: () => import('./question-dashboard/question-dashboard.module').then((m) => m.QuestionDashboardModule)
            },
            {
                path: 'questionselection',
                loadChildren: () => import('./questionselection/questionselection.module').then((m) => m.QuestionselectionModule)
            }
            

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}

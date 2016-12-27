import { NgModule, ModuleWithProviders } from "@angular/core";
import { TNSFontIconService, TNSFontIconPipe } from 'nativescript-ng2-fonticon';

@NgModule({
    declarations: [TNSFontIconPipe],
    exports: [TNSFontIconPipe]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [{
                provide: TNSFontIconService,
                useFactory: () => {
                    return new TNSFontIconService({
                        'fa': 'font-awesome.css'
                    })
                }
            }]
        };
    }
}
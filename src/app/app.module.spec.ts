import { AppModule } from './app.module';
import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

describe('AppModule', () => {
    let appModule: AppModule;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[FormsModule],
            //declarations: [ MyComponent ]
          })
          .compileComponents();
        appModule = new AppModule();
    });

    it('should create an instance', () => {
        expect(appModule).toBeTruthy();
    });
});

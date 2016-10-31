import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { TasksModule } from './about.module';

export function main() {
   describe('About component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [TasksModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let aboutDOMEl = fixture.debugElement.children[0].nativeElement;

	          expect(aboutDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Tareas');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-about></sd-about>'
})
class TestComponent {}

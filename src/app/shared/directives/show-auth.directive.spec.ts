import { Subject, of } from 'rxjs';

import { ShowAuthenticatedDirective } from './show-auth.directive';

describe('ShowAuthenticatedDirective', () => {
  let directive: ShowAuthenticatedDirective;
  const elMock = jasmine.createSpyObj([''], {
    nativeElement: { style: { display: '' } },
  });
  const routerMock = jasmine.createSpyObj([''], {
    events: new Subject(),
  });
  const authLocalStorageMock = jasmine.createSpyObj(['isTokenAvailable']);

  beforeEach(() => {
    directive = new ShowAuthenticatedDirective(
      elMock,
      routerMock,
      authLocalStorageMock
    );
  });

  it('should be defined', () => {
    expect(directive).toBeDefined();
  });

  it('should call handleVisibility and subscribe to router events OnInit', () => {
    const handleVisibilitySpy = spyOn(directive, 'handleVisibility');

    directive.ngOnInit();

    routerMock.events.next();

    expect(handleVisibilitySpy).toHaveBeenCalledTimes(2);
  });

  it('should hide element calling handleVisibility if no token', () => {
    authLocalStorageMock.isTokenAvailable.and.returnValue(false);
    const hideSpy = spyOn(directive as any, 'hide').and.callThrough();

    directive.handleVisibility();

    expect(hideSpy).toHaveBeenCalled();
  });

  it('should show element calling handleVisibility if token exists', () => {
    authLocalStorageMock.isTokenAvailable.and.returnValue(true);
    const hideSpy = spyOn(directive as any, 'hide').and.callThrough();
    const showSpy = spyOn(directive as any, 'show').and.callThrough();

    directive.handleVisibility();

    expect(hideSpy).toHaveBeenCalled();
    expect(showSpy).toHaveBeenCalled();
  });
});

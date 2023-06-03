import { of } from 'rxjs';

import { HideAuthenticatedDirective } from './hide-auth.directive';

describe('HideAuthenticatedDirective', () => {
  let directive: HideAuthenticatedDirective;
  const elMock = jasmine.createSpyObj([''], {
    nativeElement: { style: { display: '' } },
  });
  const routerMock = jasmine.createSpyObj([''], {
    events: of(),
  });
  const authLocalStorageMock = jasmine.createSpyObj(['isTokenAvailable']);

  beforeEach(() => {
    directive = new HideAuthenticatedDirective(
      elMock,
      routerMock,
      authLocalStorageMock
    );
  });

  it('should be defined', () => {
    expect(directive).toBeDefined();
  });

  it('should hide element calling handleVisibility if token exists', () => {
    authLocalStorageMock.isTokenAvailable.and.returnValue(true);
    const hideSpy = spyOn(directive as any, 'hide').and.callThrough();

    directive.handleVisibility();

    expect(hideSpy).toHaveBeenCalled();
  });

  it('should show element calling handleVisibility if no token', () => {
    authLocalStorageMock.isTokenAvailable.and.returnValue(false);
    const showSpy = spyOn(directive as any, 'show').and.callThrough();

    directive.handleVisibility();

    expect(showSpy).toHaveBeenCalled();
  });
});

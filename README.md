react testing library and vitest

1.vi.fn()

Instead of executing real logic, a function created with vi.fn() records every time it gets called and lets you control what it returns

2.mockResolvedValueOnce
Because fetch() is an async function, it always returns a Promise.

Using mockResolvedValueOnce is clean shorthand:

3.vi.mocked

vi.mocked is used for ts to get all the methods to ts

4.act()
For testing hooks in isolation (renderHook): Using act(() => result.current.action()) is the standard and correct way for synchronous state changes.
`
For avoiding act() entirely: Render a dummy component and use userEvent.click().

5.renderHook

it is like render and but it will be descrtured to the returned values
from the hook

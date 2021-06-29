import { get } from 'svelte/store';
import { render, fireEvent } from '@testing-library/svelte';

import Counter from './Counter.svelte';

import { count } from './count.store';

describe('Counter', () => {
  let updateSpy;
  // I tried to jest.mock but then Svelte found an undefined store :/
  let initialValue = get(count);

  beforeEach(() => {
    updateSpy = jest.spyOn(count, 'update');
  });

  afterEach(() => {
    updateSpy.mockClear();
    count.set(initialValue);
  });

  it('shows proper label', () => {
    const container = render(Counter, { steps: [1, 10] });

    expect(container.getByTestId(`counter-increment--10`)).toBeInTheDocument();
    expect(container.getByTestId(`counter-increment--1`)).toBeInTheDocument();
    expect(container.getByTestId(`counter-increment-1`)).toBeInTheDocument();
    expect(container.getByTestId(`counter-increment-10`)).toBeInTheDocument();
  });

  it('updates the store on Click (+10)', async () => {
    const container = render(Counter, { steps: [1, 10] });

    const incrementButton = container.getByTestId(`counter-increment-10`);

    await fireEvent.click(incrementButton);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(get(count)).toBe(10);
  });

  it('updates the store on Click (-10)', async () => {
    const container = render(Counter, { steps: [1, 10] });

    const incrementButton = container.getByTestId(`counter-increment--10`);

    await fireEvent.click(incrementButton);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(get(count)).toBe(-10);
  });
});

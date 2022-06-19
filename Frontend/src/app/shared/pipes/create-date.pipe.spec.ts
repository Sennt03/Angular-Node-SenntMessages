import { CreateDatePipe } from './create-date.pipe';

describe('CreateDatePipe', () => {
  it('create an instance', () => {
    const pipe = new CreateDatePipe();
    expect(pipe).toBeTruthy();
  });
});

import { maybePlural } from '../utils';
//------------------------------------------------------------------------------
describe('maybePlural', () => {
  //----------------------------------------------------------------------------
  it('returns the singular given a count of 1', () => {
    expect(maybePlural(1, 'dog')).toBe('1 dog');
    expect(maybePlural(1, 'dog', 'z')).toBe('1 dog');
    expect(maybePlural(1, 'dog', 'dagz', true)).toBe('1 dog');
  });
  //----------------------------------------------------------------------------
  it.each([2, 0, 0.25, -1])(
    'returns given word with default suffix given a count different from 1',
    (count) => {
      expect(maybePlural(count, 'dog')).toBe(`${count} dogs`);
    }
  );
  //----------------------------------------------------------------------------
  it.each([5, -0, 0.25, -1])(
    'returns given word with given suffix given a count different from 1',
    (count) => {
      expect(maybePlural(count, 'bus', 'es')).toBe(`${count} buses`);
    }
  );
  //----------------------------------------------------------------------------
  it('returns given suffix as irregular plural given a count different from 1 when irregular is true', () => {
    expect(maybePlural(2, 'knife', 'knives', true)).toBe('2 knives');
  });
});

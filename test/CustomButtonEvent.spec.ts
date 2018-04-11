import { expect } from 'chai';
import {} from 'mocha';
import CustomButtonEvent from '../src/lib/event/CustomButtonEvent';

describe('#CustomButtonEvent', () => {
  it('should clone itself', () => {
    const customButtonEvent = new CustomButtonEvent(CustomButtonEvent.FIRE, { event: 'foo' });
    expect(customButtonEvent.clone()).to.deep.equal(customButtonEvent);
  });
});

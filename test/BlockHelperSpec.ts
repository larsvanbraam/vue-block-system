import { expect } from 'chai';
import {} from 'mocha';
import BlockHelper from '../src/lib/util/BlockHelper';

describe('#BlockHelper', () => {
	it('should validate a block and fail', () => {
		expect(BlockHelper.isValidBlock('BlockA')).to.be.false;
	});
});
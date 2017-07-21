import { expect } from 'chai';
import {} from 'mocha';
import mockInput from './api/mockInput';
import mockOutput from './api/mockOutput';
import PageLayoutHelper from '../src/lib/util/PageLayoutHelper';
import BlockHelper from '../src/lib/util/BlockHelper';

describe('#PageLayoutHelper', () => {
	it('should parse the layout', () => {
		BlockHelper.availableBlocks = ['BlockFoo', 'BlockBar'];
		PageLayoutHelper.parse(mockInput, 'dummy').then((result) => {
			expect(result).to.deep.equal(mockOutput);
		})
	});
});
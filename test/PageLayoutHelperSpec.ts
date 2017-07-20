import { expect } from 'chai';
import {} from 'mocha';
import PageLayoutHelper from '../src/lib/util/PageLayoutHelper';
import mockInput from './api/mockInput';
import mockOutput from './api/mockOutput';

describe('#PageLayoutHelper', () => {
	it('should parse the layout', () => {
		PageLayoutHelper.parse(mockInput, 'dummy').then((result) => {
			expect(result).to.deep.equal(mockOutput);
		})
	});
});
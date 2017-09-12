import { isArray, isObject } from 'lodash';
import IBlock from '../interface/block/IBlock';

/**
 * @class BlockHelper
 * @description A simple class that contains methods that are used for handling the blocks in the application
 */
class BlockHelper {
	/**
	 * @public
	 * @static counter
	 * @description All blocks need a unique id, therefore we keep track of a counter
	 * @type {number}
	 */
	public static counter: number = 0;
	/**
	 * @public
	 * @static availableBlocks
	 * @description Collection of the available blocks as provided by the BlockSystem plugin
	 * @type { Array<string> }
	 */
	public static availableBlocks: Array<string> = [];

	/**
	 * @public
	 * @method parsedBlocks
	 * @param {Array<IBlock>}parsedBlocks - All the blocks that are already parsed
	 * @param {Array<IBlock>}blocks - All the new blocks that still need to be parsed
	 * @param {boolean} recursive - Flag if we want to re-run the method recursively
	 * @description A simple method that parses an array of blocks as provided by the API and converts them to something
	 * the application understands. It also filters out unsupported blocks
	 */
	public static parseBlocks(parameters: {
		parsedBlocks: Array<IBlock>,
		blocks: Array<IBlock> | { [key: string]: IBlock },
		recursive?: boolean,
	}): Array<IBlock> | void {
		const { parsedBlocks, blocks, recursive } = parameters;
		if (isArray(blocks)) {
			// Loop through the blocks
			blocks.forEach((block, index) => {
				if (BlockHelper.isValidBlock(block.id)) {
					// Add an index so all blocks can be unique even though they have the same Id
					block.blockIndex = BlockHelper.counter++;
					// Store a clone in the parsed block array
					parsedBlocks.push(JSON.parse(JSON.stringify(block)));
					if (block.data.blocks !== void 0) {
						if (isArray(block.data.blocks)) {
							const lastBlock = parsedBlocks[parsedBlocks.length - 1];
							lastBlock.data.blocks = [];
							BlockHelper.parseBlocks({
								parsedBlocks: lastBlock.data.blocks,
								blocks: block.data.blocks,
								recursive: true,
							});
						} else if (isObject(block.data.blocks)) {
							// Add the block index to the child blocks
							Object.keys(parsedBlocks[index].data.blocks).forEach((key) => {
								const block = parsedBlocks[index].data.blocks[key];
								block.blockIndex = BlockHelper.counter++;
							});
						} else {
							throw new Error('Unsupported block type!');
						}
					}
				}
			});
		}


		if (!recursive) {
			return parsedBlocks;
		}
	}

	/**
	 * @private
	 * @method isValidBlock
	 * @description check if a block is valid and exists in the section map
	 * @param {string} id
	 * @returns {boolean}
	 */
	public static isValidBlock(id: string): boolean {
		if (BlockHelper.availableBlocks.indexOf(id) > -1) {
			return true;
		} else {
			console.warn(`[PageLayoutModel] Unknown block (${id}), please register it when 
			initializing the BlockSystem plugin.`);
			return false;
		}
	}

	/**
	 * @public
	 * @method normalizeChildBlocks
	 * @description the blocks key can either be an array or an object with child blocks. To normalize this we have
	 * this little helper function
	 * @param blocks
	 * @returns {any}
	 */
	public static normalizeChildBlocks(blocks: Array<IBlock> | { [key: string]: IBlock }): Array<IBlock> {
		if (isArray(blocks)) {
			return blocks;
		} else {
			return Object.keys(blocks).map((key) => {
				return {
					id: key,
					data: blocks[key],
				};
			});
		}
	}
}

export default BlockHelper;

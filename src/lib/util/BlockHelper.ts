import { camelCase } from 'lodash';
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
	public static availableBlocks: Array<string>;

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
		blocks: Array<IBlock>,
		recursive?: boolean
	}): Array<IBlock> | void {
		let { parsedBlocks, blocks, recursive } = parameters;
		// Loop through the blocks
		blocks.forEach((block, index) => {
			const blockId = BlockHelper.parseBlockId(block.id);

			if (BlockHelper.isValidBlock(blockId)) {
				// Store the id
				block.data.id = blockId;
				// Add an index so all blocks can be unique even though they have the same Id
				block.blockIndex = BlockHelper.counter++;

				// Store a clone in the parsed block array
				parsedBlocks.push(JSON.parse(JSON.stringify(block)));

				if (block.data.blocks !== void 0) {
					let lastBlock = parsedBlocks[parsedBlocks.length - 1];
					lastBlock.data.blocks = [];
					BlockHelper.parseBlocks({
						parsedBlocks: lastBlock.data.blocks,
						blocks: block.data.blocks,
						recursive: true
					});
				}
			}
		});

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
		if (BlockHelper.availableBlocks.indexOf(BlockHelper.parseBlockId(id)) > -1) {
			return true;
		} else {
			console.warn(`[PageLayoutModel] Unknown block (${BlockHelper.parseBlockId(id)}), please register it when initializing the BlockSystem plugin.`);
			return false;
		}
	}

	/**
	 * @private
	 * @method parseBlockId
	 * @description If the backend returns the block id with the block prefix we want to strip this out. Because blocks never start with the block prefix.
	 * @param id
	 * @returns {string}
	 */
	private static parseBlockId(id: string): string {
		const camelCasedId = camelCase(id);
		return camelCasedId.charAt(0).toUpperCase() + camelCasedId.slice(1);
	}
}

export default BlockHelper;

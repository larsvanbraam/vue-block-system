import { IParsedBlocks } from '../interface/block/IParsedBlocks';
import { IBlock } from '../interface/block/IBlock';

const isArray = require('lodash/isArray');
const isObject = require('lodash/isObject');
const upperFirst = require('lodash/upperFirst');

/**
 * @class BlockHelper
 * @description A simple class that contains methods that are used for handling the blocks in the application
 */
export default class BlockHelper {
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
   * @private
   * @static method parseArrayBlocks
   * @param {IParsedBlocks} parsedBlocks
   * @param {Array<IBlock>} blocks
   */
  private static parseArrayBlocks(parsedBlocks: IParsedBlocks, blocks: Array<IBlock>): void {
    blocks.forEach(block => {
      // Pascal case the backend response in case it's in the wrong format!
      block.id = upperFirst(block.id);

      if (BlockHelper.isValidBlock(block.id)) {
        // Add an index so all blocks can be unique even though they have the same Id
        block.blockIndex = BlockHelper.counter++;
        const blockKey = Object.keys(parsedBlocks).length.toString();

        // Store a clone in the parsed block array
        parsedBlocks[blockKey] = JSON.parse(JSON.stringify(block));

        if (parsedBlocks[blockKey].data.blocks !== void 0) {
          (<IBlock>parsedBlocks[blockKey]).data.blocks = {};
          this.parseBlocks(parsedBlocks[blockKey].data.blocks, block.data.blocks, true);
        }
      }
    });
  }

  /**
   * @private
   * @static method parseObjectBlocks
   * @param {IParsedBlocks} parsedBlocks
   * @param {{[p: string]: IBlock}} blocks
   */
  private static parseObjectBlocks(
    parsedBlocks: IParsedBlocks,
    blocks: { [key: string]: IBlock },
  ): void {
    // Add the block index to the child blocks
    Object.keys(blocks).forEach(key => {
      const block = blocks[key];

      // Pascal case the backend response in case it's in the wrong format!
      block.id = upperFirst(block.id);

      if (BlockHelper.isValidBlock(key)) {
        block.blockIndex = BlockHelper.counter++;
        parsedBlocks[key] = JSON.parse(JSON.stringify(block));

        if (block.data.blocks !== void 0) {
          (<IBlock>parsedBlocks[key]).data.blocks = {};
          this.parseBlocks(<IParsedBlocks>parsedBlocks[key].data.blocks, block.data.blocks, true);
        }
      }
    });
  }

  /**
   * @public
   * @method parsedBlocks
   * @param {Array<IBlock>}parsedBlocks - All the blocks that are already parsed
   * @param {Array<IBlock>}blocks - All the new blocks that still need to be parsed
   * @param {boolean} recursive - Flag if we want to re-run the method recursively
   * @description A simple method that parses an array of blocks as provided by the API and converts them to something
   * the application understands. It also filters out unsupported blocks
   */
  public static parseBlocks(
    parsedBlocks: IParsedBlocks,
    blocks: Array<IBlock> | { [key: string]: IBlock },
    recursive?: boolean,
  ): IParsedBlocks | void {
    if (isArray(blocks)) {
      BlockHelper.parseArrayBlocks(parsedBlocks, <Array<IBlock>>blocks);
    } else if (isObject(blocks)) {
      BlockHelper.parseObjectBlocks(parsedBlocks, <{ [key: string]: IBlock }>blocks);
    } else {
      throw new Error('Unsupported block type!');
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
    }

    throw new Error(
      `[BlockHelper] Unknown block (${id}), please register it when initializing the BlockSystem plugin.`,
    );
  }

  /**
   * @public
   * @method normalizeChildBlocks
   * @description the blocks key can either be an array or an object with child blocks. To normalize this we have
   * this little helper function
   * @param blocks
   * @returns {any}
   */
  public static normalizeChildBlocks(
    blocks: Array<IBlock> | { [key: string]: IBlock },
  ): Array<IBlock> {
    if (isArray(blocks)) {
      return <Array<IBlock>>blocks;
    }

    return Object.keys(blocks).map(key => {
      return {
        id: key,
        data: blocks[key],
      };
    });
  }
}

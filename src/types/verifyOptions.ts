import { FlashFreqValues, FlashModeValues } from "./arguments.js";

/**
 * Callback function type for reporting verification progress.
 * @callback VerifyProgressCallback
 * @param {number} fileIndex - The index of the current file being verified.
 * @param {number} bytesVerified - The number of bytes verified so far.
 * @param {number} totalBytes - The total number of bytes to verify.
 */
export type VerifyProgressCallback = ((fileIndex: number, bytesVerified: number, totalBytes: number) => void) | null;

/**
 * Result of a single file verification.
 * @interface VerifyResult
 */
export interface VerifyResult {
  /**
   * The flash address that was verified.
   * @type {number}
   */
  address: number;

  /**
   * Whether the verification was successful.
   * @type {boolean}
   */
  success: boolean;

  /**
   * The expected MD5 hash of the data.
   * @type {string}
   */
  expectedMd5: string;

  /**
   * The actual MD5 hash read from flash.
   * @type {string}
   */
  flashMd5: string;

  /**
   * Number of byte differences (only populated if diff is true and verification failed).
   * @type {number | undefined}
   */
  differenceCount?: number;

  /**
   * Array of difference details (only populated if diff is true and verification failed).
   * Each entry contains: [address, flashByte, expectedByte]
   * @type {Array<[number, number, number]> | undefined}
   */
  differences?: Array<[number, number, number]>;
}

/**
 * Options for verifying flash memory contents.
 * @interface VerifyFlashOptions
 */
export interface VerifyFlashOptions {
  /**
   * An array of file objects representing the data to be verified.
   * @type {Array<{ data: string; address: number }>}
   */
  fileArray: { data: string; address: number }[];

  /**
   * The flash mode to be used (e.g., QIO, QOUT, DIO, DOUT).
   * Used to update bootloader image parameters before comparison.
   * @type {FlashModeValues}
   */
  flashMode?: FlashModeValues;

  /**
   * The flash frequency to be used.
   * Used to update bootloader image parameters before comparison.
   * @type {FlashFreqValues}
   */
  flashFreq?: FlashFreqValues;

  /**
   * If true, perform a byte-by-byte comparison on verification failure
   * to show detailed differences.
   * @type {boolean}
   */
  diff?: boolean;

  /**
   * A function to report the progress of the verification operation (optional).
   * @type {VerifyProgressCallback}
   */
  reportProgress?: VerifyProgressCallback;

  /**
   * A function to calculate the MD5 hash of the firmware image.
   * This is required because Web Crypto API does not support MD5.
   * You can use libraries like 'js-md5', 'spark-md5', or 'crypto-js'.
   *
   * @example
   * ```typescript
   * import md5 from 'js-md5';
   * // ...
   * calculateMD5Hash: (image) => md5(image)
   * ```
   *
   * @type {(image: string) => string}
   */
  calculateMD5Hash: (image: string) => string;
}

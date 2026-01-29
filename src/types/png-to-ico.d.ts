declare module "png-to-ico" {
  /**
   * Convert PNG buffer(s) to ICO format
   * @param input - Single PNG buffer or array of PNG buffers
   * @returns Promise that resolves to ICO buffer
   */
  function pngToIco(input: Buffer | Buffer[]): Promise<Buffer>;
  export default pngToIco;
}

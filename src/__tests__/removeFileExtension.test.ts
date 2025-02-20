import { removeFileExtension } from '../removeFileExtension';

describe('removeFileExtension', () => {
  it('should remove the file extension from a filename', () => {
    const filename = 'example.txt';
    const result = removeFileExtension(filename);
    expect(result).toBe('example');
  });

  it('should not modify the filename if there is no extension', () => {
    const filename = 'example';
    const result = removeFileExtension(filename);
    expect(result).toBe('example');
  });

  it('should remove the extension from a filename with multiple dots', () => {
    const filename = 'archive.tar.gz';
    const result = removeFileExtension(filename);
    expect(result).toBe('archive.tar');
  });

  it('should return an empty string if the filename is only the extension', () => {
    const filename = '.hiddenfile';
    const result = removeFileExtension(filename);
    expect(result).toBe('');
  });

  it('should handle filenames with paths', () => {
    const filename = 'folder/subfolder/example.txt';
    const result = removeFileExtension(filename);
    expect(result).toBe('folder/subfolder/example');
  });

  it('should return the filename unchanged if it ends with a dot', () => {
    const filename = 'example.';
    const result = removeFileExtension(filename);
    expect(result).toBe('example.');
  });
});
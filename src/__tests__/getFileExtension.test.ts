import { getFileExtension } from '../getFileExtension';

describe('getFileExtension', () => {
    it('should return the correct file extension', () => {
        const filename = 'example.txt';
        const result = getFileExtension(filename);
        expect(result).toBe('txt');
    });

    it('should return an empty string if there is no extension', () => {
        const filename = 'example';
        const result = getFileExtension(filename);
        expect(result).toBe('');
    });

    it('should return an empty string if the extension is at the start of the filename', () => {
        const filename = '.hiddenfile';
        const result = getFileExtension(filename);
        expect(result).toBe('');
    });

    it('should return an empty string if the extension is at the end of the filename', () => {
        const filename = 'example.';
        const result = getFileExtension(filename);
        expect(result).toBe('');
    });

    it('should handle filenames with special characters', () => {
        const filename = 'file name with spaces.txt';
        const result = getFileExtension(filename);
        expect(result).toBe('txt');
    });

    it('should handle paths with different separators', () => {
        const filename = 'folder/subfolder/example.txt';
        const result = getFileExtension(filename);
        expect(result).toBe('txt');
    });

    it('should return an empty string for an empty filename', () => {
        const filename = '';
        const result = getFileExtension(filename);
        expect(result).toBe('');
    });

    it('should handle filenames with multiple dots', () => {
        const filename = 'archive.tar.gz';
        const result = getFileExtension(filename);
        expect(result).toBe('gz');
    });
});
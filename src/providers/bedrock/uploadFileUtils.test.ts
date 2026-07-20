import { BedrockUploadFileTransformerConfig } from './uploadFileUtils';

const getSystemTransform = () => {
  const anthropicConfig = BedrockUploadFileTransformerConfig.anthropic as any;
  const messagesConfig = anthropicConfig.messages as any[];
  const systemConfig = messagesConfig.find((c) => c.param === 'system');
  if (!systemConfig?.transform) {
    throw new Error('system transform not found');
  }
  return systemConfig.transform as (params: any) => any;
};

describe('BedrockAnthropic upload-file system message transform', () => {
  it('does not throw on an empty system content array', () => {
    const transform = getSystemTransform();
    const result = transform({
      messages: [{ role: 'system', content: [] }],
    });
    expect(result).toBe('');
  });

  it('still reads text from array-form system content', () => {
    const transform = getSystemTransform();
    const result = transform({
      messages: [
        { role: 'system', content: [{ type: 'text', text: 'be concise' }] },
      ],
    });
    expect(result).toBe('be concise');
  });
});

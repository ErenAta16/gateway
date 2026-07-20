import { AnthropicChatCompleteConfig } from './chatComplete';

const getSystemTransform = () => {
  const messagesConfig = AnthropicChatCompleteConfig.messages as any[];
  const systemConfig = messagesConfig.find((c) => c.param === 'system');
  if (!systemConfig?.transform) {
    throw new Error('system transform not found');
  }
  return systemConfig.transform as (params: any) => any;
};

describe('AnthropicChatCompleteConfig system message transform', () => {
  it('does not throw on an empty system content array', () => {
    const transform = getSystemTransform();
    const result = transform({
      messages: [{ role: 'system', content: [] }],
    } as any);
    expect(result).toEqual([]);
  });

  it('still transforms array-form system content', () => {
    const transform = getSystemTransform();
    const result = transform({
      messages: [
        { role: 'system', content: [{ type: 'text', text: 'be concise' }] },
      ],
    } as any);
    expect(result).toEqual([{ text: 'be concise', type: 'text' }]);
  });
});

import re, difflib, json
s = open('preview.js', encoding='utf-8').read()
block = s.split('const dailyChats={', 1)[1].split('};', 1)[0]
rows = re.findall(r"'([^']+)'\s*:\s*'([^']*)'", block)
rows = [r for r in rows if r[1] and not r[1].startswith('【')]
items = [(f'每日 {d}', text) for d, text in rows]
start = s.index('const chatPools=')
end = s.index('};', start) + 1
pool_block = s[start:end]
for name in ['random', 'roast', 'companion']:
    marker = name + ':'
    a = pool_block.index(marker) + len(marker)
    b = pool_block.index(']', a) + 1
    values = json.loads(pool_block[a:b])
    label = {'random':'随机闲聊','roast':'日常吐槽','companion':'陪伴对话'}[name]
    items.extend((f'{label} {i+1}', text) for i, text in enumerate(values))
out = []
for i, (d, a) in enumerate(items):
    for d2, b in items[i+1:]:
        ratio = difflib.SequenceMatcher(None, a, b).ratio()
        if ratio > 0.30:
            out.append((ratio, d, d2, a, b))
out.sort(reverse=True)
print(json.dumps({'count': len(items), 'matches': [(round(x[0]*100, 1), x[1], x[2], x[3], x[4]) for x in out]}, ensure_ascii=False, indent=2))

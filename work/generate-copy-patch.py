import json, openpyxl
ws = openpyxl.load_workbook(r'C:\Users\fangding\Desktop\账本文案替换清单.xlsx', data_only=True).active
pools = {}
for r in list(ws.values)[1:]:
    if r[0] == '角色闲聊' and r[2] in ['【随机闲聊文案待提供】','【日常吐槽文案待提供】','【陪伴对话文案待提供】'] and r[3]:
        pools[r[2]] = [x.split('.', 1)[1].strip() if '.' in x else x.strip() for x in r[3].splitlines() if x.strip()]
R = json.dumps(pools['【随机闲聊文案待提供】'], ensure_ascii=False, separators=(',', ':'))
T = json.dumps(pools['【日常吐槽文案待提供】'], ensure_ascii=False, separators=(',', ':'))
C = json.dumps(pools['【陪伴对话文案待提供】'], ensure_ascii=False, separators=(',', ':'))
with open(r'work/copy.patch', 'w', encoding='utf-8', newline='\n') as f:
    f.write('*** Begin Patch\n*** Update File: preview.js\n@@\n')
    f.write('-const idleChats=[\n- \'【随机闲聊文案待提供】\',\n- \'【日常吐槽文案待提供】\',\n- \'【陪伴对话文案待提供】\'\n-];\n')
    f.write('+const chatPools={\n+ random:' + R + ',\n+ roast:' + T + ',\n+ companion:' + C + '\n+};\n')
    f.write('@@\n-function randomChat(){\n- const line=idleChats[Math.floor(Math.random()*idleChats.length)];\n+function randomChat(){\n+ const pools=[chatPools.random,chatPools.roast,chatPools.companion];\n+ const pool=pools[Math.floor(Math.random()*pools.length)];\n+ const line=pool[Math.floor(Math.random()*pool.length)];\n*** End Patch\n')

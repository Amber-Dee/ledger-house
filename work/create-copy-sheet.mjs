import fs from 'node:fs/promises';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';

const outputDir = 'C:/Users/fangding/Documents/Codex/2026-09-20/referenced-chatgpt-conversation-this-is-an/outputs';
await fs.mkdir(outputDir, { recursive: true });
const wb = Workbook.create();
const sheet = wb.worksheets.add('文案清单');
sheet.showGridLines = false;
sheet.getRange('A1:E1').values = [['模块', '使用位置 / 触发方式', '当前文案', '替换文案（请填写）', '文件 / 说明']];
const rows = [
 ['角色名称','对话框顶部','怀英 · 账本小屋','','preview.js；由页面顶部名称使用'],
 ['角色闲聊','点击角色 → 陪你待一会儿','【随机闲聊文案待提供】','','preview.js / idleChats'],
 ['角色闲聊','随机闲聊内容','【角色今天想说的话待提供】','','preview.js / idleChats'],
 ['角色闲聊','随机闲聊内容','【日常吐槽文案待提供】','','preview.js / idleChats'],
 ['角色闲聊','随机闲聊内容','【陪伴对话文案待提供】','','preview.js / idleChats'],
 ['角色闲聊','闲聊后按钮','再聊一句','','preview.js'],
 ['角色闲聊','闲聊后按钮','回到选择','','preview.js'],
 ['角色闲聊','闲聊后按钮','先这样吧','','preview.js'],
 ['主菜单','点击角色后','你来啦！是要记账吗？我把小本子拿来了。','','preview.js / menu()'],
 ['主菜单按钮','选择入口','记账 · 我花了一笔钱','','preview.js'],
 ['主菜单按钮','选择入口','入账 · 我收到钱啦','','preview.js'],
 ['主菜单按钮','选择入口','查看账单','','preview.js'],
 ['主菜单按钮','选择入口','陪你待一会儿','','preview.js'],
 ['记账对话','选择支出后','这笔钱是用来干什么了？告诉我，我帮你分好类。','','preview.js / begin()'],
 ['记账对话','选择收入后','哇，有进账！这笔钱是从哪里来的呀？','','preview.js / begin()'],
 ['收入分类','选择收入类型','工资 / 奖金 / 红包 / 其他收入','','preview.js'],
 ['支出分类','选择支出类型','餐饮 / 购物 / 交通 / 居住 / 娱乐休闲 / 医疗健康 / 学习办公 / 其他','','preview.js'],
 ['金额输入','选择分类后','原来是「分类」呀。那这次花了多少钱？','','preview.js / amount()；收入时“花了”会变为“收到了”'],
 ['金额输入','金额标签','我告诉小栗：金额（元）','','preview.js；建议改为“我告诉怀英”'],
 ['金额输入','金额占位提示','例如 18.50','','preview.js'],
 ['备注输入','金额下方','要留下备注吗？','','preview.js'],
 ['备注输入','备注状态','可选','','preview.js'],
 ['备注输入','备注占位提示','例如：和朋友吃午饭','','preview.js'],
 ['保存账单','保存按钮','就是这些，帮我记一下','','preview.js'],
 ['记账点评','收入保存后','钱包鼓起来了！我的松果罐也想收到这样的好消息。','','preview.js / remark'],
 ['记账点评','餐饮支出保存后','吃饱了才有力气生活！下次有好吃的记得叫我。','','preview.js / remark'],
 ['记账点评','其他支出保存后','每一笔小钱都值得认真对待。现在可以安心休息啦。','','preview.js / remark'],
 ['记账完成','保存成功后的句式','这笔「金额」元，我记在「分类」里了。「角色点评」','','preview.js'],
 ['记账完成按钮','保存成功后','看看账本','','preview.js'],
 ['记账完成按钮','保存成功后','还想记一笔','','preview.js'],
 ['记账完成按钮','保存成功后','谢谢，辛苦你啦','','preview.js'],
 ['账本','月份标题','「年份」年「月份」月账本','','preview.js / showLedgerMonth()'],
 ['账本','支出统计标题','本月支出','','preview.js'],
 ['账本','无记录月份','之前还没有记录哦。','','preview.js'],
 ['账本','星期标题','一 / 二 / 三 / 四 / 五 / 六 / 日','','preview.js'],
 ['账本','无支出日期金额','0.00','','preview.js'],
 ['账本详情','日期详情标题','「日期」 · 当日详情','','preview.js'],
 ['账本详情','无记录日期','这一天还没有记录哦。','','preview.js'],
 ['年度总结','页面标题','「年份」年总结','','preview.js'],
 ['年度总结','消费统计标题','全年消费占比','','preview.js'],
 ['年度总结','收入统计标题','全年收入占比','','preview.js'],
 ['资产','页面标题','资产','','preview.js / showAssets()'],
 ['资产','资产卡片','净资产 / 资产 / 负债','','preview.js'],
 ['资产','添加账户按钮','＋添加账户','','preview.js'],
 ['资产','添加账户标题','添加账户','','preview.js'],
 ['资产','账户类型标题','选择账户类型','','preview.js'],
 ['资产','账户输入','账户名称 / 当前余额','','preview.js'],
 ['资产','账户按钮','保存账户 / 保存修改','','preview.js'],
 ['资产','账户详情提示','账户详情和余额调整功能待接入。','','preview.js']
];
sheet.getRange(`A2:E${rows.length+1}`).values = rows;
sheet.getRange('A1:E1').format = { fill: '#1D8F78', font: { name: 'Aptos', size: 11, bold: true, color: '#FFFFFF' }, horizontalAlignment: 'center', verticalAlignment: 'center', wrapText: true };
sheet.getRange(`A2:E${rows.length+1}`).format = { font: { name: 'Aptos', size: 10, color: '#20342E' }, verticalAlignment: 'center', wrapText: true };
sheet.getRange(`D2:D${rows.length+1}`).format = { fill: '#FFF4C2', font: { name: 'Aptos', size: 10, color: '#20342E' }, verticalAlignment: 'center', wrapText: true };
sheet.getRange(`A1:E${rows.length+1}`).format.borders = { preset: 'all', style: 'thin', color: '#D8E3DD' };
sheet.getRange('A1:E1').format.rowHeight = 30;
sheet.getRange(`A2:E${rows.length+1}`).format.rowHeight = 32;
sheet.getRange('A:A').format.columnWidth = 16;
sheet.getRange('B:B').format.columnWidth = 24;
sheet.getRange('C:C').format.columnWidth = 44;
sheet.getRange('D:D').format.columnWidth = 34;
sheet.getRange('E:E').format.columnWidth = 34;
sheet.freezePanes.freezeRows(1);
wb.recalculate();
const preview = await wb.render({ sheetName: '文案清单', range: `A1:E${rows.length+1}`, scale: 1, format: 'png' });
await fs.writeFile(`${outputDir}/copy-sheet-preview.png`, new Uint8Array(await preview.arrayBuffer()));
const out = await SpreadsheetFile.exportXlsx(wb);
await out.save(`${outputDir}/账本文案替换清单.xlsx`);

import { Context } from 'koishi';

export const ow_i18n = {
  zh_CN: {
    // 段位
    Bronze: '青铜',
    Silver: '白银',
    Gold: '黄金',
    Platinum: '铂金',
    Diamond: '钻石',
    Master: '大师',
    Grandmaster: '宗师',
    // 职业
    tank: '坦克',
    offense: '输出',
    support: '辅助',
    // 英雄名称
    ana: '安娜',
    ashe: '艾什',
    baptiste: '巴蒂斯特',
    bastion: '堡垒',
    brigitte: '布丽吉塔',
    dva: 'D.Va',
    doomfist: '末日铁拳',
    echo: '回声',
    genji: '源氏',
  },
  en_US: {
    // 段位
    Bronze: '青铜',
    Silver: '白银',
    Gold: '黄金',
    Platinum: '铂金',
    Diamond: '钻石',
    Master: '大师',
    Grandmaster: '宗师',
    // 职业
    tank: '坦克',
    offense: '输出',
    support: '辅助',
    // 英雄名称
    ana: 'Ana',
    ashe: 'Ashe',
    baptiste: 'Baptiste',
    bastion: 'Bastion',
    brigitte: 'Brigitte',
    dva: 'D.Va',
    doomfist: 'Doomfist',
    echo: 'Echo',
    genji: 'Genji',
  },
};

export const i18nRegister = (ctx: Context) => {
  ctx.i18n.define('zh_CN', ow_i18n.zh_CN);
  ctx.i18n.define('en_US', ow_i18n.en_US);
};

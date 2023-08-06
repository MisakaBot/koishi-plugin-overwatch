import { Context, Schema } from 'koishi';
import { ow_i18n, i18nRegister } from './i18n';

import { GameMode, OW, Plantform, Region } from '@witch-elaina/ow-api';

export const name = 'overwatch';

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  const ow = new OW();
  // todo: i18n
  const cur_i18n = 'zh_CN';
  i18nRegister(ctx);
  ctx
    .command('ow <player> [platform] [region]', '查询玩家基本信息')
    .action(async ({ session }, player, platform, region) => {
      const data = await ow.getBasicInfo(player, platform as Plantform, region as Region);
      const rank = data.ratings.map((item) => {
        return `${ow_i18n[cur_i18n][item.role]} ${ow_i18n[cur_i18n][item.group]}${item.tier}`;
      });
      return (
        <>
          <p>玩家：{data.name}</p>
          {rank.map((item) => (
            <p>{item}</p>
          ))}
          <p>胜场：{data.gamesWon}</p>
          <p>总场：{data.gamesPlayed}</p>
        </>
      );
    });

  ctx
    .command('ow.top <player> [num:number] [platform] [region]', '查询玩家常用英雄')
    .action(
      async ({ session }, player, num = 5, platform = Plantform.PC, region = Region.GLOBAL) => {
        const compData = await ow.getTopHeroes(
          player,
          num,
          GameMode.COMPETITIVE,
          platform as Plantform,
          region as Region,
        );
        const quickData = await ow.getTopHeroes(
          player,
          num,
          GameMode.QUICKPLAY,
          platform as Plantform,
          region as Region,
        );
        const comp = compData.map((item, index) => {
          return (
            <>
              <p>
                No{index + 1} {ow_i18n?.[cur_i18n]?.[item.name]}
              </p>
              <p>
                胜场:{item.gamesWon} 时长:{item.timePlayed}
              </p>
            </>
          );
        });
        const quick = quickData.map((item, index) => {
          return (
            <>
              <p>
                No{index + 1} {ow_i18n?.[cur_i18n]?.[item.name]}
              </p>
              <p>
                胜场:{item.gamesWon} 时长:{item.timePlayed}
              </p>
            </>
          );
        });
        return (
          <>
            <p>
              {player}的 Top {num} 英雄
            </p>
            <p>竞技模式：</p>
            {comp.map((item) => (
              <p>{item}</p>
            ))}
            <p>快速模式：</p>
            {quick.map((item) => (
              <p>{item}</p>
            ))}
          </>
        );
      },
    );
}

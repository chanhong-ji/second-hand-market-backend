import client from '../../client';
import { zoneFirst, zoneSecond } from '../../dataList';
import {
  createErrorMessage,
  zoneIdProcess,
  zoneNameProcess,
} from '../../shared.utils';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    createZone: async () => {
      try {
        for (let i = 0; i < zoneFirst.length; i++) {
          for (let j = 0; j < zoneSecond[i].length; j++) {
            const zoneId = zoneIdProcess(i, j);
            const zoneName = zoneNameProcess(zoneId);
            if (!zoneName) continue;

            await client.zone.create({
              data: {
                id: zoneId,
                name: zoneName,
              },
            });
          }
        }

        return { ok: true };
      } catch (error) {
        return {
          ok: false,
          error: createErrorMessage('createZone', error),
        };
      }
    },
  },
};

export default resolvers;

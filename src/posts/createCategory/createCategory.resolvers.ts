import client from '../../client';
import { Resolvers } from '../../types';

const CATEGORY_LIST = [
  '디지털기기',
  '생활가전',
  '가구/인테리어',
  '유아동',
  '유아도서',
  '생활/가공식품',
  '스포츠/레저',
  '여성잡화',
  '여성의류',
  '남성패션/잡화',
  '게임/취미',
  '뷰티/미용',
  '반려동물용품',
  '도서/티켓/음반',
  '식물',
  '기타 중고물품',
];

const resolvers: Resolvers = {
  Mutation: {
    createCategory: async (_, { names }) => {
      const namesAfter = names.filter((name: string) =>
        CATEGORY_LIST.includes(name)
      );

      const { count } = await client.category.createMany({
        data: namesAfter.map((name: string) => ({
          name,
        })),
        skipDuplicates: true,
      });

      return { ok: true, count };
    },
  },
};

export default resolvers;

import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType } from './memberType.js';
import { MemberTypeId } from './memberTypeId.js';
import DataLoader from 'dataloader';

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (profile, args, ctx, info) => {
        let dl = ctx.dataLoaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids: readonly String[]) => {
            const memberTypes = await ctx.prisma.memberType.findMany({
              where: {
                id: {
                  in: ids,
                },
              },
            });
            return ids.map((id) => memberTypes.find((memberType) => memberType.id == id));
          });
          ctx.dataLoaders.set(info.fieldNodes, dl);
        }
        return await dl.load(profile.memberTypeId);
      },
    },
  }),
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
  }),
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    MemberTypeId: { type: MemberTypeId },
  }),
});

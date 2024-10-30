import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Post } from '../types/post.js';
import { User } from '../types/user.js';
import { MemberType } from '../types/memberType.js';
import { Profile } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';
import { MemberTypeId } from '../types/memberTypeId.js';

export const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: () => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: async (_, args, ctx) => {
        return await ctx.memberType.findMany();
      },
    },
    memberType: {
      type: MemberType,
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeId),
        },
      },
      resolve: async (_, args, ctx) => {
        return await ctx.memberType.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (_, args, ctx) => {
        return await ctx.user.findMany();
      },
    },
    user: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args, ctx) => {
        return await ctx.user.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: async (_, args, ctx) => {
        return await ctx.post.findMany();
      },
    },
    post: {
      type: Post,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args, ctx) => {
        return await ctx.post.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Profile))),
      resolve: async (_, args, ctx) => {
        return await ctx.profile.findMany();
      },
    },
    profile: {
      type: Profile,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, args, ctx) => {
        return await ctx.profile.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
  }),
});

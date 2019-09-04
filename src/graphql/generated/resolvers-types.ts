export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type League = {
  _id: Scalars["String"];
  name: Scalars["String"];
  country: Scalars["String"];
  teams?: Maybe<Array<Team>>;
};

export type LeagueInput = {
  _id?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  country: Scalars["String"];
};

export type Mutation = {
  newLeague: League;
  newTeam: Team;
  newPlayer: Player;
};

export type MutationNewLeagueArgs = {
  input: LeagueInput;
};

export type MutationNewTeamArgs = {
  input: TeamInput;
};

export type MutationNewPlayerArgs = {
  input: PlayerInput;
};

export type Player = {
  _id: Scalars["String"];
  name: Scalars["String"];
  shirtNumber?: Maybe<Scalars["Int"]>;
  position?: Maybe<Scalars["String"]>;
  nationality?: Maybe<Scalars["String"]>;
  teamId: Scalars["String"];
  team?: Maybe<Team>;
};

export type PlayerInput = {
  _id?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  shirtNumber?: Maybe<Scalars["Int"]>;
  position?: Maybe<Scalars["String"]>;
  nationality?: Maybe<Scalars["String"]>;
  teamId: Scalars["String"];
};

export type Query = {
  leagues: Array<League>;
  leage?: Maybe<League>;
  team?: Maybe<Team>;
  player?: Maybe<Player>;
};

export type QueryLeageArgs = {
  leagueId: Scalars["String"];
};

export type QueryTeamArgs = {
  teamId: Scalars["String"];
};

export type QueryPlayerArgs = {
  playerId: Scalars["String"];
};

export type Team = {
  _id: Scalars["String"];
  name: Scalars["String"];
  leagueId: Scalars["String"];
  league?: Maybe<League>;
  players?: Maybe<Array<Maybe<Player>>>;
};

export type TeamInput = {
  _id?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  leagueId: Scalars["String"];
};

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {};
  League: League;
  String: Scalars["String"];
  Team: Team;
  Player: Player;
  Int: Scalars["Int"];
  Mutation: {};
  LeagueInput: LeagueInput;
  TeamInput: TeamInput;
  PlayerInput: PlayerInput;
  Boolean: Scalars["Boolean"];
  CacheControlScope: CacheControlScope;
  Upload: Scalars["Upload"];
};

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {
    maxAge?: Maybe<Maybe<Scalars["Int"]>>;
    scope?: Maybe<Maybe<CacheControlScope>>;
  }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LeagueResolvers<
  ContextType = any,
  ParentType = ResolversTypes["League"]
> = {
  _id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  country?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  teams?: Resolver<
    Maybe<Array<ResolversTypes["Team"]>>,
    ParentType,
    ContextType
  >;
};

export type MutationResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Mutation"]
> = {
  newLeague?: Resolver<
    ResolversTypes["League"],
    ParentType,
    ContextType,
    MutationNewLeagueArgs
  >;
  newTeam?: Resolver<
    ResolversTypes["Team"],
    ParentType,
    ContextType,
    MutationNewTeamArgs
  >;
  newPlayer?: Resolver<
    ResolversTypes["Player"],
    ParentType,
    ContextType,
    MutationNewPlayerArgs
  >;
};

export type PlayerResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Player"]
> = {
  _id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  shirtNumber?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  nationality?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  teamId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes["Team"]>, ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Query"]
> = {
  leagues?: Resolver<Array<ResolversTypes["League"]>, ParentType, ContextType>;
  leage?: Resolver<
    Maybe<ResolversTypes["League"]>,
    ParentType,
    ContextType,
    QueryLeageArgs
  >;
  team?: Resolver<
    Maybe<ResolversTypes["Team"]>,
    ParentType,
    ContextType,
    QueryTeamArgs
  >;
  player?: Resolver<
    Maybe<ResolversTypes["Player"]>,
    ParentType,
    ContextType,
    QueryPlayerArgs
  >;
};

export type TeamResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Team"]
> = {
  _id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  leagueId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  league?: Resolver<Maybe<ResolversTypes["League"]>, ParentType, ContextType>;
  players?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Player"]>>>,
    ParentType,
    ContextType
  >;
};

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export type Resolvers<ContextType = any> = {
  League?: LeagueResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<
  ContextType
>;

interface Size {
  width: number;
  height: number;
}

interface Meta {
  dimensions: {
    [key: string]: Size;
  };
}

interface PosterImage {
  tiny: string;
  large: string;
  small: string;
  medium: string;
  original: string;
  meta: Meta;
}

interface CoverImage {
  tiny: string;
  large: string;
  small: string;
  original: string;
  meta: {
    [key: string]: Size;
  };
}

interface Attributes {
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  synopsis: string;
  description: string;
  coverImageTopOffset: number;
  titles: {
    en: string;
    en_jp: string;
    ja_jp: string;
  };
  canonicalTitle: string;
  abbreviatedTitles: any[];
  averageRating?: any;
  ratingFrequencies: {
    [key: number]: string;
  };
  userCount: number;
  favoritesCount: number;
  startDate: string;
  endDate?: any;
  nextRelease?: any;
  popularityRank: number;
  ratingRank?: any;
  ageRating: string;
  ageRatingGuide?: any;
  subtype: string;
  status: string;
  tba?: any;
  posterImage: PosterImage;
  coverImage: CoverImage;
  episodeCount?: any;
  episodeLength?: any;
  totalLength: number;
  youtubeVideoId: string;
  showType: string;
  nsfw: boolean;
}

interface LinkParent {
  links: {
    self: string;
    related: string;
  };
}

interface Relationships {
  [key: string]: LinkParent;
}

interface Anime {
  id: string;
  type: string;
  links: { self: string };
  attributes: Attributes;
  relationships: Relationships;
}

export interface Search {
  data: Anime[];
}

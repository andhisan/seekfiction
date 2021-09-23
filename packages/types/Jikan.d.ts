interface Jpg {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface Webp {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface Images {
  jpg: Jpg;
  webp: Webp;
}

interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: {
    image_url: string;
    small_image_url: string;
    medium_image_url: string;
    large_image_url: string;
    maximum_image_url: string;
  };
}

interface Prop {
  from: {
    day: number;
    month: number;
    year: number;
  };
  to: {
    day?: any;
    month?: any;
    year?: any;
  };
}

interface Aired {
  from: Date;
  to?: any;
  prop: Prop;
  string: string;
}

interface Broadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

interface Producer {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Studio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Anime {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes?: any;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score?: any;
  scored_by?: any;
  rank?: any;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background?: any;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Producer[];
  licensors: any[];
  studios: Studio[];
  genres: Genre[];
}

export interface Search {
  pagination: {
    last_visible_page: 1;
    has_next_page: false;
  };
  data: Anime[];
}

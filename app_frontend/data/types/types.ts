export interface CardSetMetaData {
  created: string;
  set_id: string;
  thumbnail_url: string;
  desc: string;
  title: string;
}

export interface CardSetMetaDataList {
  CardSets: CardSetMetaData[];
}

export interface CardSetList {
  METADATA: CardSetMetaData;
  cards: Card[];
}

export interface Card {
  image_url: string;
  set_id: string;
  card_id: string;
}

export interface StatusResponse {
  error: string;
}